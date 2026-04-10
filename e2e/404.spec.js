const { test, expect } = require("@playwright/test");

test.describe("404 page", () => {
  test("should render a not found page for missing routes", async ({ page }) => {
    const response = await page.goto("/missing-route/");

    expect(response.status()).toBe(404);
    await expect(page.locator("h1")).toContainText("Page not found.");
    await expect(page.locator(".not-found-description")).toBeVisible();
    await expect(
      page.locator('a.action-link[href="/"]')
    ).toContainText("Back to landing page");
    await expect(
      page.locator('button.action-link[type="button"]')
    ).toContainText("Go back");
  });

  test("should navigate home from the 404 page", async ({ page }) => {
    await page.goto("/missing-route/");
    await page.locator('a.action-link[href="/"]').click();

    await expect(page).toHaveURL("/");
    await expect(page.locator("h1")).toContainText("Osmar Petry");
  });

  test("should return to the previous page from the 404 page", async ({ page }) => {
    await page.goto("/projects/");
    await page.goto("/missing-route/");

    await page.locator('button.action-link[type="button"]').click();

    await expect(page).toHaveURL(/\/projects\//);
    await expect(page.locator("h1")).toContainText("Projects.");
  });
});
