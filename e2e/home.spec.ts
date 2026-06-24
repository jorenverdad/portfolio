import { test, expect } from "@playwright/test";

test.describe("Home Page - Basic Layout", () => {
  test("should load and display the core layout structure", async ({ page }) => {
    // Navigate to the home page
    await page.goto("/");

    // Verify the page title matches the expected pattern
    await expect(page).toHaveTitle(/Joren Verdad/);

    // Verify the header is visible
    const header = page.locator("header");
    await expect(header).toBeVisible();

    // Verify the NavBar is present within the header
    const nav = header.locator("nav");
    await expect(nav).toBeVisible();

    // Verify the main content wrapper is present
    const main = page.locator("main");
    await expect(main).toBeVisible();

    // Verify the Hero section is visible
    const heroSection = page.locator("#home");
    await expect(heroSection).toBeVisible();

    // Verify the footer is present at the bottom of the page
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
  });
});
