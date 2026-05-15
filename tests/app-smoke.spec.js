import { expect, test } from "@playwright/test";

test("login page loads", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
  await expect(
    page.getByText("Sign in to view or create your fitness routine.")
  ).toBeVisible();
  await expect(page.getByLabel("Email")).toBeVisible();
  await expect(page.getByLabel("Password")).toBeVisible();
  await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
});

test("test user can sign up or log in, create a routine, and see the dashboard", async ({
  page
}) => {
  const testEmail = process.env.VITE_TEST_EMAIL;
  const testPassword = process.env.VITE_TEST_PASSWORD;

  test.skip(
    !testEmail || !testPassword,
    "Set VITE_TEST_EMAIL and VITE_TEST_PASSWORD to run the Firebase auth flow."
  );

  await page.goto("/login");

  await page.getByLabel("Email").fill(testEmail);
  await page.getByLabel("Password").fill(testPassword);
  await page.getByRole("button", { name: "Login" }).click();

  try {
    await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible({
      timeout: 5000
    });
  } catch {
    await page.goto("/register");
    await page.getByLabel("Email").fill(testEmail);
    await page.getByLabel("Password").fill(testPassword);
    await page.getByRole("button", { name: "Register" }).click();
    await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
  }

  await page.getByRole("link", { name: "Questionnaire" }).click();
  await expect(
    page.getByRole("heading", { name: "Create Your Routine" })
  ).toBeVisible();

  await page.getByLabel("Goal").selectOption("fat_loss");
  await page.getByLabel("Experience").selectOption("beginner");
  await page.getByLabel("Days available").selectOption("3");
  await page.getByLabel("Equipment").selectOption("home");
  await page.getByRole("button", { name: "Generate and Save Routine" }).click();

  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "3-Day Home Fat Loss Routine" })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Daily Progress" })
  ).toBeVisible();
});
