const { defineConfig, devices } = require("@playwright/test");

const liveBaseURL = process.env.LIVE_BASE_URL;

module.exports = defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: liveBaseURL || "http://localhost:9000",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: liveBaseURL
    ? undefined
    : {
        command: "npm run build && npm run serve",
        url: "http://localhost:9000",
        reuseExistingServer: !process.env.CI,
        timeout: 180000,
      },
});
