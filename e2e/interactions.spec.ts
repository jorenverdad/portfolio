import { test, expect } from "@playwright/test";

test.describe("Hero & Social Interactions", () => {
  test("should verify the download resume link is correct", async ({ page }) => {
    await page.goto("/");
    const downloadBtn = page.getByRole("link", { name: /Download Resume/i });
    await expect(downloadBtn).toBeVisible();
    await expect(downloadBtn).toHaveAttribute("href", "/pdfs/CV_JorenVerdad-2026.pdf");
    await expect(downloadBtn).toHaveAttribute("target", "_blank");
    await expect(downloadBtn).toHaveAttribute("rel", /noopener/);
  });

  test("should display the copy email tooltip on hover", async ({ page }) => {
    await page.goto("/");
    const copyBtn = page.getByLabel("Copy Email");
    await expect(copyBtn).toBeVisible();

    // Hover over the copy button to trigger the tooltip
    await copyBtn.hover();
    
    // Verify the "Copy Email" tooltip is visible
    const tooltip = page.locator("text=Copy Email");
    await expect(tooltip).toBeVisible();
  });

  test("should mock and verify the copy email button click", async ({ page }) => {
    let copiedText = "";
    
    // Expose function to capture clipboard write
    await page.exposeFunction("mockWriteText", (text: string) => {
      copiedText = text;
    });

    // Mock clipboard API before page loads
    await page.addInitScript(() => {
      Object.defineProperty(navigator, "clipboard", {
        value: {
          writeText: async (text: string) => {
            (window as any).mockWriteText(text);
          }
        },
        configurable: true
      });
    });

    await page.goto("/");

    // Locate the copy email button by its aria-label
    const copyBtn = page.getByLabel("Copy Email");
    await expect(copyBtn).toBeVisible();

    // Click the button directly to copy the email (no hover beforehand)
    await copyBtn.click();

    // Verify the clipboard function was called with the correct email
    expect(copiedText).toBe("jorenverdad@gmail.com");

    // Verify the UI displays the checkmark and "Copied!" feedback
    const checkIcon = copyBtn.locator("svg.lucide-check");
    await expect(checkIcon).toBeVisible();

    // The tooltip should mount and show "Copied!" immediately without transition conflicts
    const copiedTooltip = page.locator("text=Copied!");
    await expect(copiedTooltip).toBeVisible();
  });

  test("should verify the timezone badge displays location and PHT info", async ({ page }) => {
    await page.goto("/");
    
    // Verify Philippines text is present
    const philippinesText = page.locator("text=Philippines");
    await expect(philippinesText).toBeVisible();

    // Verify UTC+8 offset text is present
    const timezoneText = page.locator("text=PHT (UTC+8)");
    await expect(timezoneText).toBeVisible();
  });

  test("should verify social links are present and correct", async ({ page }) => {
    await page.goto("/");

    // Locate the social icon buttons in the hero section
    const instagramLink = page.getByLabel("Instagram Profile");
    const facebookLink = page.getByLabel("Facebook Profile");
    const linkedInLink = page.getByLabel("LinkedIn Profile");

    await expect(instagramLink).toHaveAttribute("href", "https://www.instagram.com/verdadjoren/");
    await expect(facebookLink).toHaveAttribute("href", "https://www.facebook.com/jorenverdad/");
    await expect(linkedInLink).toHaveAttribute("href", "https://www.linkedin.com/in/jorenverdad/");

    // Check target attribute
    await expect(instagramLink).toHaveAttribute("target", "_blank");
    await expect(facebookLink).toHaveAttribute("target", "_blank");
    await expect(linkedInLink).toHaveAttribute("target", "_blank");
  });
});
