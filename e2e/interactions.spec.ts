import { test, expect } from "@playwright/test";

declare global {
  interface Window {
    mockWriteText: (text: string) => Promise<void>;
  }
}

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
      const mockClipboard = {
        writeText: async (text: string) => {
          await window.mockWriteText(text);
        }
      };
      
      try {
        // 1. Try to define the property directly on navigator
        Object.defineProperty(navigator, "clipboard", {
          value: mockClipboard,
          configurable: true,
          writable: true
        });
      } catch {
        try {
          // 2. Fallback: try defining it on the prototype of Navigator
          Object.defineProperty(Object.getPrototypeOf(navigator), "clipboard", {
            get: () => mockClipboard,
            configurable: true
          });
        } catch {
          // 3. Ultimate fallback: override navigator entirely
          const newNavigator = Object.create(navigator, {
            clipboard: {
              value: mockClipboard,
              configurable: true,
              writable: true
            }
          });
          Object.defineProperty(window, "navigator", {
            value: newNavigator,
            configurable: true
          });
        }
      }
    });

    await page.goto("/");

    // Locate the copy email button by its aria-label
    const copyBtn = page.getByLabel("Copy Email");
    await expect(copyBtn).toBeVisible();

    // Hover over the button first to ensure the tooltip is mounted and visible
    await copyBtn.hover();
    await expect(page.locator("text=Copy Email")).toBeVisible();

    // Dispatch click event directly to copy the email without shifting focus or moving the pointer
    await copyBtn.dispatchEvent("click");

    // Verify the clipboard function was called with the correct email
    expect(copiedText).toBe("jorenverdad@gmail.com");

    // Verify the UI displays the checkmark and "Copied!" feedback
    const checkIcon = copyBtn.locator("svg.lucide-check");
    await expect(checkIcon).toBeVisible();

    // The tooltip text should update to "Copied!" immediately
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
