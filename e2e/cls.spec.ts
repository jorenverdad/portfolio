import { test, expect, type Page } from "@playwright/test";

type LayoutShiftEntry = PerformanceEntry & {
  value: number;
  hadRecentInput: boolean;
  sources: Array<{
    node?: Node;
    currentRect: DOMRectReadOnly;
    previousRect: DOMRectReadOnly;
  }>;
};

async function measureCls(page: Page, viewportSize?: { width: number; height: number }): Promise<number> {
  if (viewportSize) {
    await page.setViewportSize(viewportSize);
  }

  // Listen to console logs from the page to see layout shift sources
  const logHandler = (msg: { type: () => string; text: () => string }) => {
    if (msg.type() === "log" && msg.text().startsWith("Layout shift")) {
      console.log(`[Browser Console] ${msg.text()}`);
    }
  };
  page.on("console", logHandler);

  await page.goto("/");

  // Wait for the page to load
  await page.waitForLoadState("load");
  // Ensure the hero section is mounted
  await page.waitForSelector("#home", { state: "visible" });

  // Measure CLS during page load and scroll
  const clsScore = await page.evaluate(async (): Promise<number> => {
    return new Promise<number>((resolve) => {
      let score = 0;
      
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as LayoutShiftEntry[]) {
          // Only count layout shifts without recent user input (within 500ms)
          if (!entry.hadRecentInput) {
            score += entry.value;
            const sourceInfo = entry.sources
              .map((s) => {
                const el = s.node as HTMLElement | null;
                if (!el) return "unknown";
                const tagName = el.tagName.toLowerCase();
                const id = el.id ? `#${el.id}` : "";
                const classes = el.className && typeof el.className === "string" 
                  ? `.${el.className.trim().replace(/\s+/g, ".")}` 
                  : "";
                return `${tagName}${id}${classes}`;
              })
              .join(", ");
            console.log(`Layout shift detected: value=${entry.value.toFixed(4)}, sources=[${sourceInfo}]`);
          }
        }
      });

      observer.observe({ type: "layout-shift", buffered: true });

      // Scroll the page slowly to trigger lazy mounting of sections
      const scrollHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      let currentScroll = 0;
      const step = 150;
      const interval = 100;

      const timer = setInterval(() => {
        currentScroll += step;
        window.scrollTo(0, currentScroll);

        if (currentScroll + viewportHeight >= scrollHeight) {
          clearInterval(timer);
          // Allow some time for final animations/layouts to settle
          setTimeout(() => {
            observer.disconnect();
            resolve(score);
          }, 1000);
        }
      }, interval);
    });
  });

  page.off("console", logHandler);
  return clsScore;
}

test.describe("Cumulative Layout Shift (CLS) Tests", () => {
  test("should have a CLS score below 0.1 on desktop", async ({ page }) => {
    const clsScore = await measureCls(page, { width: 1280, height: 800 });
    console.log(`[Desktop] Total Cumulative Layout Shift (CLS) Score: ${clsScore.toFixed(4)}`);
    expect(clsScore).toBeLessThan(0.1);
  });

  test("should have a CLS score below 0.1 on mobile", async ({ page }) => {
    const clsScore = await measureCls(page, { width: 375, height: 812 });
    console.log(`[Mobile] Total Cumulative Layout Shift (CLS) Score: ${clsScore.toFixed(4)}`);
    expect(clsScore).toBeLessThan(0.1);
  });
});
