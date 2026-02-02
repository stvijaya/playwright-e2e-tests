import { test, expect } from "@playwright/test";
test("Should load homepage with title", async ({ page }) => {
  await page.goto("https://katalon-demo-cura.herokuapp.com/");
  await expect(page).toHaveTitle("CURA Healthcare Service");
  await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");
  
  await page.locator("//*[@id='btn-make-appointment']").click();
  await expect(page.getByText("Please login to make appointment.")).toBeVisible();
  await page.getByLabel("Username").fill("John Doe");
  await page.getByLabel("Password").fill("ThisIsNotAPassword");
  await page.getByRole('button',{name:'Login'}).click();

   await expect(page.locator("h2")).toContainText("Make Appointment");

});
