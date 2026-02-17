import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../../fixtures/fixture";

Given("I am on the Service NSW Stamp Duty page", async function (this: CustomWorld) {
  await this.stampDutyPage!.openStampDutyPage();
  await this.stampDutyPage!.verifyPageTitle();
});

When("I click the Check Online button", async function (this: CustomWorld) {
  await this.stampDutyPage!.clickCheckOnline();
});

Then("I should be redirected to the Revenue NSW calculator page", async function (this: CustomWorld) {
  await this.calculatorPage!.verifyPageUrl("/erevenue/calculators/motorsimple.php");
  await this.calculatorPage!.verifyPageElements();
});

When(
  "I select {string} for Is this registration for a passenger vehicle?",
  async function (this: CustomWorld, registration: string) {
    await this.calculatorPage!.selectPassengerVehicle(registration === "Yes");
  },
);

When("I enter Purchase price or value as {string}", async function (this: CustomWorld, purchaseAmount: string) {
  await this.calculatorPage!.enterPurchasePrice(purchaseAmount);
});

When("I click Calculate", async function (this: CustomWorld) {
  await this.calculatorPage!.clickCalculate();
});

Then(
  "the duty payable should be calculated for a passenger vehicle: {string} with purchase price: {string}",
  async function (this: CustomWorld, registration: string, purchaseAmount: string) {
    await this.calculatorPage!.verifyCalculationPopupContent(registration, purchaseAmount);
  },
);

Then(/I perform an accessibility check on the (.+) page$/, async function (this: CustomWorld, pageName: string) {
  const normalizedPage = pageName.toLowerCase();

  if (normalizedPage.includes("service nsw")) {
    await this.stampDutyPage!.performAccessibilityCheck();
  } else if (normalizedPage.includes("calculator")) {
    await this.calculatorPage!.performAccessibilityCheck();
  } else {
    throw new Error(`Accessibility scan failed: Page name "${pageName}" not recognized.`);
  }
});
