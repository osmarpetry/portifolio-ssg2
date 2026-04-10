const { test, expect } = require("@playwright/test");

test.describe("Post detail page", () => {
  test("should render a post with title, content, and responsive breadcrumb", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 480, height: 960 });
    await page.goto("/posts/");
    const chips = page.locator(".posts-filter__chip");
    const tagChip = chips.nth(1);

    await tagChip.click();

    const firstCard = page.locator(".posts-index-card").first();
    const postTitle = await firstCard.locator(".posts-index-card__title").textContent();
    await firstCard.click();

    await expect(page.locator(".markdown-page__title")).toContainText(postTitle.trim());
    await expect(page.locator(".markdown-prose")).toBeVisible();
    await expect(page.locator(".breadcrumb__link").first()).toContainText("Blog");

    const currentCrumb = page.locator(".breadcrumb__current--truncate");
    const currentCrumbText = page.locator(".breadcrumb__current-text");
    const currentCrumbLabel = (await currentCrumb.textContent()).trim();

    await expect(currentCrumb).toHaveAttribute("title", currentCrumbLabel);
    await expect(currentCrumb).toHaveAttribute("aria-label", currentCrumbLabel);
    await expect(currentCrumb).toHaveCSS("font-weight", "400");
    await expect(currentCrumb).toHaveCSS("white-space", "nowrap");
    await expect(currentCrumb).toHaveCSS("text-overflow", "ellipsis");

    const overflowState = await currentCrumb.getAttribute("data-overflowing");

    if (overflowState === "true") {
      await currentCrumb.hover();
      await page.waitForTimeout(250);
      await expect(currentCrumbText).not.toHaveCSS("transform", "none");
    }
  });

  test("should render related notes as post links and syntax-highlight code", async ({
    page,
  }) => {
    await page.goto("/posts/javascript-modules-and-bundlers/");

    await expect(
      page.locator('a[href="/posts/javascript-closures-and-curries/"]').last()
    ).toContainText("Closures and Curries");
    await expect(
      page.locator('a[href="/posts/react-forwardRef/"]').last()
    ).toContainText("Forwarding Ref");
    await expect(page.locator('a[href="/posts/javascript-generator/"]')).toHaveCount(0);

    const missingGeneratorLink = page
      .locator(".post-inline-link--missing")
      .filter({ hasText: "Generator" })
      .last();

    await expect(missingGeneratorLink).toContainText("Generator");
    await expect(missingGeneratorLink).toHaveAttribute(
      "aria-label",
      "Generator. Page does not exist."
    );
    await expect(missingGeneratorLink).toHaveAttribute(
      "title",
      "Page does not exist."
    );
    await expect(missingGeneratorLink).toHaveAttribute(
      "data-tooltip-message",
      "Page does not exist."
    );
    await expect(missingGeneratorLink).toHaveCSS("cursor", "default");

    const highlightedCode = page.locator(".markdown-prose pre code.hljs").first();

    await expect(highlightedCode).toBeVisible();
    await expect(highlightedCode.locator(".hljs-keyword").first()).toBeVisible();
  });
});
