const { test, expect } = require("@playwright/test");

test.describe("Posts page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/blog/");
  });

  test("should display the posts heading", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("Blog.");
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
    const tagLabel = (await secondChip.textContent()).trim();
    await secondChip.click();

    await expect(secondChip).toHaveClass(/is-active/);
    await expect(page).toHaveURL(/\/blog\/#tag=/);
    await expect(page.locator(".breadcrumb__link")).toContainText("Blog");
    await expect(page.locator(".breadcrumb__current")).toContainText(tagLabel);
  });

  test("should show 'All posts' chip as active by default", async ({ page }) => {
    const allPostsChip = page.locator(".posts-filter__chip").first();

    await expect(allPostsChip).toHaveClass(/is-active/);
    await expect(allPostsChip).toContainText("All posts");
    await expect(page.locator(".breadcrumb__link")).toContainText("Blog");
    await expect(page.locator(".breadcrumb__current")).toContainText("All Posts");
    await expect(page).toHaveURL(/\/blog\/$/);
  });

  test("should return breadcrumb to all posts after clearing a tag", async ({
    page,
  }) => {
    const chips = page.locator(".posts-filter__chip");
    const allPostsChip = chips.first();
    const secondChip = chips.nth(1);

    await secondChip.click();
    await expect(page).toHaveURL(/\/blog\/#tag=/);

    await allPostsChip.click();

    await expect(allPostsChip).toHaveClass(/is-active/);
    await expect(page.locator(".breadcrumb__link")).toContainText("Blog");
    await expect(page.locator(".breadcrumb__current")).toContainText("All Posts");
    await expect(page).toHaveURL(/\/blog\/$/);
  });
});
