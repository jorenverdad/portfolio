import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { chromium } from "@playwright/test";
import sharp from "sharp";

const VIDEOS = [
  {
    videoFile: "JoSan - AI-Powered Content Moderation - Google Chrome.mp4",
    outputName: "josan-preview.webp",
    seekTime: 0.8,
  },
  {
    videoFile: "VZ Stellar Realty - Google Chrome.mp4",
    outputName: "vzstellar-preview.webp",
    seekTime: 0.8,
  },
  {
    videoFile: "Portfolio- Honey.mp4",
    outputName: "portfolio-preview.webp",
    seekTime: 0.8,
  },
  {
    videoFile: "JoSan Extension - Chromium.mp4",
    outputName: "josan-extension-preview.webp",
    seekTime: 0.8,
  },
];

const projectsDir = path.resolve("public/projects");

// Spin up a simple static HTTP server for the videos
const server = http.createServer((req, res) => {
  const filePath = path.join(projectsDir, decodeURIComponent(req.url.slice(1)));
  if (!fs.existsSync(filePath)) {
    res.writeHead(404);
    res.end();
    return;
  }
  const stat = fs.statSync(filePath);
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : stat.size - 1;
    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${stat.size}`,
      "Accept-Ranges": "bytes",
      "Content-Length": end - start + 1,
      "Content-Type": "video/mp4",
    });
    fs.createReadStream(filePath, { start, end }).pipe(res);
  } else {
    res.writeHead(200, {
      "Content-Length": stat.size,
      "Content-Type": "video/mp4",
    });
    fs.createReadStream(filePath).pipe(res);
  }
});

await new Promise((resolve) => server.listen(8999, resolve));
console.log("Serving video files on http://localhost:8999");

try {
  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });
  const page = await context.newPage();

  for (const item of VIDEOS) {
    console.log(`Processing: ${item.videoFile}`);
    const encodedName = encodeURIComponent(item.videoFile);
    const videoUrl = `http://localhost:8999/${encodedName}`;

    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <body style="margin: 0; background: black; overflow: hidden;">
          <video id="vid" src="${videoUrl}" muted playsinline preload="auto" style="width: 1920px; height: 1080px; object-fit: cover;"></video>
        </body>
      </html>
    `);

    // Wait for video to seek safely
    await page.evaluate(async (seekTime) => {
      const vid = document.getElementById("vid");
      
      const waitEvent = (el, evt, timeoutMs = 6000) =>
        new Promise((resolve) => {
          const timer = setTimeout(resolve, timeoutMs);
          el.addEventListener(
            evt,
            () => {
              clearTimeout(timer);
              resolve();
            },
            { once: true }
          );
        });

      if (vid.readyState < 2) {
        await Promise.race([
          waitEvent(vid, "loadeddata"),
          waitEvent(vid, "canplay"),
        ]);
      }

      vid.currentTime = Math.min(seekTime, (vid.duration || 1) - 0.1);

      if (vid.seeking) {
        await waitEvent(vid, "seeked");
      }

      await new Promise((res) => requestAnimationFrame(res));
    }, item.seekTime);

    // Short breather for the compositor
    await page.waitForTimeout(600);

    const videoLocator = page.locator("#vid");
    const screenshotBuffer = await videoLocator.screenshot({ type: "png" });

    // Use sharp to convert to high quality WebP
    const outputPath = path.join(projectsDir, item.outputName);
    await sharp(screenshotBuffer)
      .webp({ quality: 85, effort: 5 })
      .toFile(outputPath);

    const stats = fs.statSync(outputPath);
    console.log(`Saved: ${item.outputName} (${Math.round(stats.size / 1024)} KB)`);
  }

  await browser.close();
} catch (err) {
  console.error("Extraction error:", err);
} finally {
  server.close();
}
console.log("Poster extraction finished!");
