const { test, expect } = require("@playwright/test");

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display the hero section with name", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("Osmar Petry");
  });

  test("should display navigation links", async ({ page }) => {
    await expect(page.locator(".nav-brand")).toBeVisible();
    await expect(page.locator('a.nav-link[href="/projects/"]')).toBeVisible();
    await expect(page.locator('a.nav-link[href="/resume/"]')).toBeVisible();
    await expect(page.locator('a.nav-link[href="/blog/"]')).toBeVisible();
  });

  test("should display companies section", async ({ page }) => {
    await expect(page.locator("#companies")).toBeVisible();
    await expect(page.locator(".companies-grid .company-item").first()).toBeVisible();
  });

  test("should display featured slides section", async ({ page }) => {
    await expect(page.locator("#featured-slides")).toBeVisible();
    await expect(page.locator(".home-slide-item").first()).toBeVisible();
    await expect(
      page.getByRole("link", { name: "See all presentations" })
    ).toBeVisible();
  });

  test("should display featured work section", async ({ page }) => {
    await expect(page.locator("#selected-work")).toBeVisible();
    await expect(page.locator(".project-card").first()).toBeVisible();
  });

  test("should display latest posts section", async ({ page }) => {
    await expect(page.locator("#latest-posts")).toBeVisible();
  });

  test("should display footer", async ({ page }) => {
    await expect(page.locator(".site-footer")).toBeVisible();
    await expect(page.locator(".footer-inner")).toContainText("Back to top");
    await expect(page.locator('.footer-inner a[href="#top"]')).toBeVisible();
  });

  test("should have skip link", async ({ page }) => {
    const skipLink = page.locator(".skip-link");
    await expect(skipLink).toHaveAttribute("href", "#main");
  });
});
