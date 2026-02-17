import { test, expect } from "@playwright/test";

test.describe("MCP - CURA Healthcare Appointment", () => {
  test("should complete appointment booking flow", async ({ page }) => {
    // Step 1: Login to the url
    await page.goto("https://katalon-demo-cura.herokuapp.com/");

    // Step 2: Verify the title CURA Healthcare Service
    await expect(page).toHaveTitle("CURA Healthcare Service");

    // Step 3: Click Make Appointment Button
    await page.locator("//*[@id='btn-make-appointment']").click();

    // Step 4: Enter the Username as John Doe
    await page.getByLabel("Username").fill("John Doe");

    // Step 5: Enter the Password as ThisIsNotAPassword
    await page.getByLabel("Password").fill("ThisIsNotAPassword");

    // Step 6: Click the Login Button
    await page.getByRole("button", { name: "Login" }).click();
    await page.waitForLoadState("networkidle");

    // Step 7: Verify the header Make Appointment
    await expect(page.locator("h2")).toContainText("Make Appointment");

    // Step 8: Select Facility dropdown as Hongkong CURA Healthcare center
    await page
      .getByLabel("Facility")
      .selectOption("Hongkong CURA Healthcare Center");

    // Step 9: Check the checkbox Apply for hospital readmission
    await page.locator("input[name='hospital_readmission']").check();

    // Step 10: Check the option button Medicaid
    await page.getByRole("radio", { name: "Medicaid" }).check();

    // Step 11: Select the visit date as 28 Feb 2026
    await page.locator("span").click();
    await page.getByRole("cell", { name: "28" }).nth(1).click();

    // Step 12: Enter the comment as Appointment for General checkup
    await page
      .getByRole("textbox", { name: "Comment" })
      .fill("Appointment for General checkup");

    // Step 13: Click the button Book Appointment
    await page.getByRole("button", { name: "Book Appointment" }).click();
    await page.waitForLoadState("networkidle");

    // Step 14: Verify the header as Appointment Confirmation
    await expect(page.locator("h2")).toContainText("Appointment Confirmation");
  });
});
