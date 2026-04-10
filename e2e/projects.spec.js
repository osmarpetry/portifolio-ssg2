const { test, expect } = require("@playwright/test");

test.describe("Projects page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/projects/");
  });

  test("should display the projects heading", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("Projects.");
  });

  test("should display project cards", async ({ page }) => {
    await expect(page.locator(".project-card").first()).toBeVisible();
  });

  test("should display the about section at bottom", async ({ page }) => {
    await expect(page.locator("#about")).toBeVisible();
  });
});
