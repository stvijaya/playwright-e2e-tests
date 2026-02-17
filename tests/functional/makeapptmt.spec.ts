import { test, expect } from "@playwright/test";

test.describe("Make Appointment", () => {
  test.beforeEach("Login Valid Cred", async ({ page }) => {
    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    await expect(page).toHaveTitle("CURA Healthcare Service");
    await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");

    await page.locator("//*[@id='btn-make-appointment']").click();
    await expect(
      page.getByText("Please login to make appointment."),
    ).toBeVisible();
    await page.getByLabel("Username").fill("John Doe");
    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.locator("h2")).toContainText("Make Appointment");
  });

  test("should make an appointment with non default values", async ({
    page,
  }) => {
    await page
      .getByLabel("Facility")
      .selectOption("Hongkong CURA Healthcare Center");
    await page.getByRole("radio", { name: "Medicare" }).check();
    await page.locator("span").click();
    await page.getByRole("cell", { name: "5" }).nth(1).click();
    await page.getByRole("textbox", { name: "Comment" }).click();
    await page
      .getByRole("textbox", { name: "Comment" })
      .fill("This is a multiline comments captured by picklocator");
    await page.getByRole("button", { name: "Book Appointment" }).click();
    await expect(page.locator("h2")).toContainText("Appointment Confirmation");
  });
});
