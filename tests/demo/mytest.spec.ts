import { test, expect } from "@playwright/test";
test("Should load homepage with title", async ({ page }) => {
  await page.goto("https://katalon-demo-cura.herokuapp.com/");
  await expect(page).toHaveTitle("CURA Healthcare Service");
  await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");
});

test.only("Should demo locators", async ({ page }) => {
  await page.locator("//h1").click();
});

test("Should prevent login with incorrect credentials", async ({ page }) => {
  await page.goto("https://katalon-demo-cura.herokuapp.com/");

  let makeAppointmentbtn = page.getByRole("link", { name: "Invalid locator" });
  console.log(
    `>> The type of locator: ${typeof makeAppointmentbtn}, The value of the locator is :${JSON.stringify(makeAppointmentbtn)}`,
  );
  await makeAppointmentbtn.click();
  await page
    .getByRole("heading", { name: "We Care About Your Health" })
    .click();
});
