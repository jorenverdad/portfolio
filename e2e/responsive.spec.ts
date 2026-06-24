import { test, expect } from "@playwright/test";

test.describe("Responsive Layout & Mobile Navigation", () => {
  
  test.describe("Mobile Viewport (iPhone 12)", () => {
    test.use({ viewport: { width: 390, height: 844 } });

    test("should show mobile menu trigger and hide desktop menu", async ({ page }) => {
      await page.goto("/");

      // Desktop navigation should be hidden
      const desktopNav = page.locator("header nav");
      await expect(desktopNav).toBeHidden();

      // Mobile menu trigger button should be visible
      // It is the button in the header with the md:hidden class
      const mobileTrigger = page.locator("header button.md\\:hidden");
      await expect(mobileTrigger).toBeVisible();
    });

    test("should open and close the mobile menu drawer", async ({ page }) => {
      await page.goto("/");

      const mobileTrigger = page.locator("header button.md\\:hidden");
      await mobileTrigger.click();

      // The mobile drawer (Dialog.Popup) should be visible
      const drawer = page.locator("div[role='dialog']");
      await expect(drawer).toBeVisible();

      // It should contain the "Menu" heading
      const menuHeading = drawer.locator("text=Menu");
      await expect(menuHeading).toBeVisible();

      // Locate the close button (Dialog.Close) inside the drawer and click it
      const closeBtn = drawer.locator("button").first(); // The close button is the first button in the drawer header
      await closeBtn.click();

      // The drawer should be hidden
      await expect(drawer).toBeHidden();
    });

    test("should navigate and close drawer when a mobile link is clicked", async ({ page }) => {
      await page.goto("/");

      // Open the mobile drawer
      const mobileTrigger = page.locator("header button.md\\:hidden");
      await mobileTrigger.click();

      const drawer = page.locator("div[role='dialog']");
      await expect(drawer).toBeVisible();

      // Locate and click the "About" link inside the mobile nav drawer
      const mobileAboutLink = drawer.locator("nav a").filter({ hasText: /^About$/ });
      await mobileAboutLink.click();

      // The drawer should automatically close after clicking a link
      await expect(drawer).toBeHidden();

      // The page should scroll to the About section
      const aboutSection = page.locator("#about");
      await expect(aboutSection).toBeVisible();
    });
  });

  test.describe("Tablet Viewport (iPad Mini)", () => {
    test.use({ viewport: { width: 768, height: 1024 } });

    test("should scale layout and show desktop nav on tablet screens", async ({ page }) => {
      await page.goto("/");

      // On tablet (768px wide), the desktop nav is designed to show (md:flex)
      const desktopNav = page.locator("header nav");
      await expect(desktopNav).toBeVisible();

      // Mobile trigger should be hidden
      const mobileTrigger = page.locator("header button.md\\:hidden");
      await expect(mobileTrigger).toBeHidden();

      // Basic shell sections should be present
      const heroSection = page.locator("#home");
      await expect(heroSection).toBeVisible();
    });
  });
});
