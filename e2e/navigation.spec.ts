import { test, expect } from "@playwright/test";

test.describe("Navigation & Scroll Behavior", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    
    // Programmatically trigger mounting of all sections immediately on load
    // to stabilize the layout and prevent lazy-mount shifts during tests.
    await page.evaluate(() => {
      window.dispatchEvent(new CustomEvent("lazy-mount-trigger", { detail: "all" }));
    });
    
    // Give a brief moment for the DOM to render the lazy-mounted components
    await page.waitForTimeout(200);
  });

  test("should have Home as the active link on initial load", async ({ page }) => {
    const homeLink = page.locator("header nav a").filter({ hasText: /^Home$/ });
    await expect(homeLink).toHaveClass(/text-foreground/);

    // Other links should not be active (they should have text-muted-foreground)
    const aboutLink = page.locator("header nav a").filter({ hasText: /^About$/ });
    await expect(aboutLink).toHaveClass(/text-muted-foreground/);
  });

  test("should scroll and update active link when a navbar item is clicked", async ({ page }) => {
    const aboutLink = page.locator("header nav a").filter({ hasText: /^About$/ });
    
    // Click the "About" link
    await aboutLink.click();

    // Verify the "About" link gets the active class (text-foreground)
    await expect(aboutLink).toHaveClass(/text-foreground/);

    // Verify the About section is visible in the viewport
    const aboutSection = page.locator("#about");
    await expect(aboutSection).toBeVisible();
  });

  test("should dynamically update the active navbar link on manual page scroll", async ({ page }) => {
    // Scroll down to the Projects section, centering it in the viewport
    // to cross the strict rootMargin: "-30% 0px -50% 0px" intersection threshold
    await page.evaluate(() => {
      const el = document.getElementById("projects");
      if (el) el.scrollIntoView({ block: "center" });
    });
    
    // Wait for scroll observer to settle
    await page.waitForTimeout(500);

    const projectLink = page.locator("header nav a").filter({ hasText: /^Project$/ });
    await expect(projectLink).toHaveClass(/text-foreground/);

    // Scroll down to the Contact section, centering it in the viewport
    await page.evaluate(() => {
      const el = document.getElementById("contact");
      if (el) el.scrollIntoView({ block: "center" });
    });
    
    // Wait for scroll observer to settle
    await page.waitForTimeout(500);

    const contactLink = page.locator("header nav a").filter({ hasText: /^Contact$/ });
    await expect(contactLink).toHaveClass(/text-foreground/);
  });

  test("should ensure lazy-mounted sections are rendered when triggered", async ({ page }) => {
    // Testimonial section should be mounted
    const testimonialSection = page.locator("#testimonial");
    await expect(testimonialSection).toBeVisible();

    // Verify content inside testimonial is loaded using the correct heading
    const heading = testimonialSection.locator("text=Client Perspectives");
    await expect(heading).toBeVisible();
  });
});
