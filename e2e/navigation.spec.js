const { test, expect } = require("@playwright/test");

test.describe("Navigation", () => {
  test("should navigate to projects page", async ({ page }) => {
    await page.goto("/");
    await page.locator('a.nav-link[href="/projects/"]').click();
    await expect(page).toHaveURL(/\/projects\//);
    await expect(page.locator("h1")).toContainText("Projects.");
  });

  test("should navigate to posts page", async ({ page }) => {
    await page.goto("/");
    await page.locator('a.nav-link[href="/posts/"]').click();
    await expect(page).toHaveURL(/\/posts\//);
    await expect(page.locator("h1")).toContainText("Posts.");
  });

  test("should navigate to resume page", async ({ page }) => {
    await page.goto("/");
    await page.locator('a.nav-link[href="/resume/"]').click();
    await expect(page).toHaveURL(/\/resume\//);
    await expect(page.locator(".resume-prose")).toBeVisible();
  });

  test("should navigate home via brand link", async ({ page }) => {
    await page.goto("/projects/");
    await page.locator(".nav-brand").click();
    await expect(page).toHaveURL("/");
  });
});
