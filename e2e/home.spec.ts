import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test("should load and display the main sections", async ({ page }) => {
    // Navigate to the home page
    await page.goto("/");

    // Verify the page title
    await expect(page).toHaveTitle(/Joren Verdad/);

    // Verify the NavBar is visible
    const nav = page.locator("nav");
    await expect(nav).toBeVisible();

    // Verify the Hero section is present
    const heroSection = page.locator("#home");
    await expect(heroSection).toBeVisible();
  });
});
