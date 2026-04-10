const { test, expect } = require("@playwright/test");

test.describe("Resume page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/resume/");
  });

  test("should display resume content", async ({ page }) => {
    await expect(page.locator(".markdown-prose")).toBeVisible();
    await expect(page.locator(".resume-prose")).toBeVisible();
  });

  test("should have a PDF download button", async ({ page }) => {
    const pdfBtn = page.locator(".resume-pdf-btn");
    await expect(pdfBtn).toBeVisible();
    await expect(pdfBtn).toHaveAttribute("href", /resume/);
  });
});
