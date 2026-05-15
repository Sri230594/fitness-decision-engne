import { defineConfig, devices } from "@playwright/test";
import fs from "node:fs";

if (fs.existsSync(".env")) {
  const envText = fs.readFileSync(".env", "utf8");

  envText.split("\n").forEach((line) => {
    const trimmedLine = line.trim();
    const equalsIndex = trimmedLine.indexOf("=");

    if (!trimmedLine || trimmedLine.startsWith("#") || equalsIndex === -1) {
      return;
    }

    const name = trimmedLine.slice(0, equalsIndex);
    const value = trimmedLine.slice(equalsIndex + 1);

    if (!process.env[name]) {
      process.env[name] = value;
    }
  });
}

export default defineConfig({
  testDir: "./tests",
  timeout: 30000,
  use: {
    baseURL: "http://localhost:5173",
    trace: "on-first-retry"
  },
  webServer: {
    command: "npm run dev",
    url: "http://localhost:5173",
    reuseExistingServer: true,
    timeout: 120000
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] }
    }
  ]
});
