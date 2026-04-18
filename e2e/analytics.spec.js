const { test, expect } = require("@playwright/test");

const MEASUREMENT_ID = "G-3STVN66PY5";

test.describe("GA4 analytics", () => {
  test("installs the GA4 gtag and queues the first page view", async ({
    page,
  }) => {
    await page.route(/https:\/\/.*google-analytics\.com\/g\/collect.*/, (route) =>
      route.abort()
    );

    await page.goto("/");

    await expect(
      page.locator(
        `script[src="https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}"]`
      )
    ).toHaveCount(1);

    const html = await page.content();

    expect(html).toContain(`gtag('config', '${MEASUREMENT_ID}'`);
    expect(html).not.toContain("analytics.js");
    expect(html).not.toMatch(/UA-\d+-\d+/);

    await expect
      .poll(
        () =>
          page.evaluate((measurementId) => {
            const entries = window.dataLayer || [];
            const read = (entry, index) => entry?.[index] || entry?.[String(index)];

            return {
              hasConfig: entries.some(
                (entry) =>
                  read(entry, 0) === "config" && read(entry, 1) === measurementId
              ),
              hasPageView: entries.some((entry) => {
                const params = read(entry, 2);

                return (
                  read(entry, 0) === "event" &&
                  read(entry, 1) === "page_view" &&
                  params?.page_path === "/"
                );
              }),
            };
          }, MEASUREMENT_ID),
        {
          message: "GA4 config and page_view should be queued in dataLayer",
        }
      )
      .toEqual({ hasConfig: true, hasPageView: true });
  });
});
