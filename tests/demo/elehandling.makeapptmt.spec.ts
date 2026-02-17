import { test, expect } from "@playwright/test";

test.describe("Make Appointment", () => {
  test.beforeEach("Login Valid Cred", async ({ page }) => {
    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    await expect(page).toHaveTitle("CURA Healthcare Service");
    await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");

    //click()
    //await page.locator("//*[@id='btn-make-appointment']").click();

    //press
    //await page.locator("//*[@id='btn-make-appointment']").press("Enter");

    //double click
    //await page.locator("//*[@id='btn-make-appointment']").dblclick();

    //rightclick
    //await page.locator("//*[@id='btn-make-appointment']").click({button:"right"});

    //hover
    //await page.locator("//*[@id='btn-make-appointment']").hover();
    
    
    await page.locator("//*[@id='btn-make-appointment']").click({timeout:10_000})


    await expect(
      page.getByText("Please login to make appointment."),
    ).toBeVisible();



    //text clear() & fill
    await page.getByLabel("Username").clear();
    //await page.getByLabel("Username").fill("John Doe");

    //press sequentially
    await page.getByLabel("Username").pressSequentially("John Doe", {delay:300})

    



    await page.getByLabel("Password").fill("ThisIsNotAPassword");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.locator("h2")).toContainText("Make Appointment");
  });

  test("should make an appointment with non default values", async ({
    page,
  }) => {

    //dropdown
    //assert default values

    await expect(page.getByLabel("Facility")).toHaveValue("Tokyo CURA Healthcare Center");
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
