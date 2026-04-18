const { test, expect } = require("@playwright/test");

const MEASUREMENT_ID = "G-3STVN66PY5";
const liveBaseURL = process.env.LIVE_BASE_URL;

test.skip(!liveBaseURL, "LIVE_BASE_URL is required for live production checks");

test.describe("Live production", () => {
  test("is served by Netlify and exposes build metadata", async ({
    page,
    request,
  }) => {
    const response = await page.goto("/");

    expect(response.status()).toBe(200);

    const headers = response.headers();
    const hasNetlifyHeader =
      Boolean(headers["x-nf-request-id"]) ||
      headers["cache-status"]?.includes("Netlify Edge");

    expect(hasNetlifyHeader).toBeTruthy();

    const appDataResponse = await request.get("/page-data/app-data.json");
    expect(appDataResponse.status()).toBe(200);

    const appData = await appDataResponse.json();
    expect(appData.webpackCompilationHash).toEqual(expect.any(String));
    expect(appData.webpackCompilationHash.length).toBeGreaterThan(0);

    const deployCommit = page.locator('meta[name="site-build-commit"]');
    await expect(deployCommit).toHaveAttribute("content", /.+/);

    const expectedDeployCommit = process.env.EXPECTED_DEPLOY_COMMIT;

    if (expectedDeployCommit) {
      await expect(deployCommit).toHaveAttribute("content", expectedDeployCommit);
    }
  });

  test("attempts a GA4 page_view collect request", async ({ page }) => {
    const collectUrls = [];

    await page.route(/https:\/\/.*google-analytics\.com\/g\/collect.*/, (route) => {
      collectUrls.push(route.request().url());
      route.abort();
    });

    await page.goto("/");

    await expect
      .poll(
        () =>
          collectUrls.some((url) => {
            const parsed = new URL(url);

            return (
              parsed.searchParams.get("tid") === MEASUREMENT_ID &&
              parsed.searchParams.get("en") === "page_view"
            );
          }),
        {
          message: `Live page should attempt GA4 page_view for ${MEASUREMENT_ID}`,
        }
      )
      .toBe(true);
  });
});
