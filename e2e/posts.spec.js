const { test, expect } = require("@playwright/test");

test.describe("Posts page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/posts/");
  });

  test("should display the posts heading", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("Posts.");
  });

  test("should display post cards", async ({ page }) => {
    await expect(page.locator(".posts-index-card").first()).toBeVisible();
  });

  test("should display filter chips", async ({ page }) => {
    await expect(page.locator(".posts-filter__chip").first()).toBeVisible();
  });

  test("should filter posts by tag", async ({ page }) => {
    const chips = page.locator(".posts-filter__chip");
    const secondChip = chips.nth(1);
    await secondChip.click();
    await expect(secondChip).toHaveClass(/is-active/);
  });

  test("should show 'All posts' chip as active by default", async ({ page }) => {
    const allPostsChip = page.locator(".posts-filter__chip").first();
    await expect(allPostsChip).toHaveClass(/is-active/);
    await expect(allPostsChip).toContainText("All posts");
  });
});
