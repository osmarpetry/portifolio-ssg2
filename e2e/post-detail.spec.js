const { test, expect } = require("@playwright/test");

test.describe("Post detail page", () => {
  test("should render a post with title and content", async ({ page }) => {
    await page.goto("/posts/");
    const firstCard = page.locator(".posts-index-card").first();
    const postTitle = await firstCard.locator(".posts-index-card__title").textContent();
    await firstCard.click();

    await expect(page.locator(".markdown-page__title")).toContainText(postTitle.trim());
    await expect(page.locator(".markdown-prose")).toBeVisible();
  });
});
