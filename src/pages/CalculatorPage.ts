import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";
import { isPriceInCurrencyFormat } from "../utils/generic";

/**
 * Page Object Model for the Revenue NSW Motor Vehicle Registration Duty Calculator
 * Handles form interaction, input validation, and modal result verification.
 */
export class CalculatorPage extends BasePage {
  // Page Elements
  private readonly pageTitle: Locator;
  private readonly calculatorHeading: Locator;

  // Passenger Component
  private readonly passengerLegend: Locator;
  private readonly passengerLink: Locator;
  private readonly passengerRadioGroup: Locator;

  // Input Fields
  private readonly purchasePriceInput: Locator;

  // Action Buttons
  private readonly calculateBtn: Locator;
  private readonly resetBtn: Locator;
  private readonly refreshBtn: Locator;

  // Pop-up modal locators
  private readonly modalContainer: Locator;
  private readonly modalTitle: Locator;
  private readonly modalSubTitle: Locator;
  private readonly modalPrintIcon: Locator;
  private readonly modalPassengerVehicleText: Locator;
  private readonly modalPurchasePriceText: Locator;
  private readonly modalDutyPayableText: Locator;
  private readonly modalCloseBtn: Locator;

  /**
   * Initializes the CalculatorPage using a mix of Role-based and CSS selectors
   * @param page
   */
  constructor(page: Page) {
    super(page);
    this.pageTitle = page.getByRole("heading", { name: "Revenue NSW calculators" });
    this.calculatorHeading = page.getByRole("heading", { name: "Motor vehicle registration duty calculator" });
    this.passengerLegend = page.locator("legend");
    this.passengerLink = this.passengerLegend.getByRole("link", { name: "passenger vehicle" });
    this.passengerRadioGroup = page.locator("#passenger");
    this.purchasePriceInput = page.getByLabel(/Purchase price or value/i);
    this.calculateBtn = page.getByRole("button", { name: "Calculate" });
    this.resetBtn = page.getByRole("button", { name: "Reset" });
    this.refreshBtn = page.getByRole("button", { name: "Refresh" });

    this.modalContainer = page.locator(".modal-content");
    this.modalTitle = this.modalContainer.locator(".modal-title");
    this.modalSubTitle = this.modalContainer.getByRole("heading", { name: "Motor vehicle registration" });
    this.modalPrintIcon = this.modalContainer.locator(".print-icon");
    this.modalPassengerVehicleText = this.modalContainer
      .locator("tr", { hasText: /passenger vehicle/i })
      .locator("td.right"); // Find the row with "passenger vehicle" and get the value as Yes/No
    this.modalPurchasePriceText = this.modalContainer.locator("tr", { hasText: /Purchase price/i }).locator("td.right");
    this.modalDutyPayableText = this.modalContainer.locator("tr", { hasText: "Duty payable" }).locator("td.right");
    this.modalCloseBtn = this.modalContainer.locator(".modal-footer button", { hasText: "Close" });
  }

  /**
   * Verifies that the current URL matches the expected calculator path
   * @param path - The partial path expected in the URL
   */
  async verifyPageUrl(path: string) {
    await expect(this.page).toHaveURL(new RegExp(`.*revenue.nsw.gov.au${path}`));
  }

  /**
   * Verifies Passenger form legend text and the embedded help link
   */
  async verifyPassengerLegendDetails() {
    const expectedText = /Is this registration for a passenger vehicle\?.*See the definition of a passenger vehicle/s;
    await expect(this.passengerLegend).toContainText(expectedText);
    await expect(this.passengerLink).toHaveAttribute("href", /motor-vehicle-duty/);
  }

  /**
   * Verifies all key elements on the Calculator page are visible
   */
  async verifyPageElements() {
    await expect(this.pageTitle).toBeVisible();
    await expect(this.calculatorHeading).toBeVisible();
    await this.verifyPassengerLegendDetails();
    await expect(this.passengerRadioGroup.getByLabel("Yes")).toBeVisible();
    await expect(this.passengerRadioGroup.getByLabel("No")).toBeVisible();
    await expect(this.purchasePriceInput).toBeVisible();
    await expect(this.calculateBtn).toBeVisible();
    await expect(this.resetBtn).toBeVisible();
  }

  /**
   * Interacts with the radio button for vehicle type question
   * @param isPassenger boolean - true for Yes, false for No
   */
  async selectPassengerVehicle(isPassenger: boolean) {
    const option = isPassenger ? "Yes" : "No";
    const radioButton = this.passengerRadioGroup.getByLabel(option);
    await radioButton.scrollIntoViewIfNeeded();
    await radioButton.click({ force: true });
  }

  /**
   * Fills the Purchase price or value input
   * @param amount string or number
   */
  async enterPurchasePrice(amount: string | number) {
    await this.purchasePriceInput.fill(amount.toString());
  }

  /**
   * Triggers the calculation by clicking the primary button
   */
  async clickCalculate() {
    await this.calculateBtn.click();
  }

  /**
   * Resets the form and verifies input is cleared
   */
  async resetForm() {
    await this.resetBtn.click();
    await expect(this.purchasePriceInput).toBeEmpty();
  }

  /**
   * Refreshes the page and verifies it reloads correctly
   * without navigating away from the calculator page
   */
  async refreshPage() {
    const initialUrl = this.page.url();
    // Promise.all to wait for both the click and the page 'load' event
    await Promise.all([this.page.waitForEvent("load"), this.refreshBtn.click()]);
    expect(this.page.url()).toBe(initialUrl);
  }

  /**
   * Handles the 'Passenger Vehicle' help link tab/page
   * @returns Page object for the new tab
   */
  async openPassengerHelpLink() {
    const [newPage] = await Promise.all([this.page.waitForEvent("popup"), this.passengerLink.click()]);
    return newPage;
  }

  /**
   * Verifies the contents of the Calculation Results modal
   * Validates modal visibility, vehicle type registration, and currency formatting
   * @param registration - Expected registration text (e.g., "Yes")
   * @param purchaseAmount - The purchase amount entered during the test
   */
  async verifyCalculationPopupContent(registration: string, purchaseAmount: string) {
    // 1. Wait for modal stability
    await expect(this.modalContainer).toBeVisible({ timeout: 10000 });
    await expect(this.modalTitle).toHaveText(/Calculation/i);
    await expect(this.modalSubTitle).toBeVisible();
    await expect(this.modalPrintIcon).toBeVisible();

    // 2. Validate Passenger registration type
    await expect(this.modalPassengerVehicleText).toHaveText(registration, { ignoreCase: true });

    // 3. Validate Purchase Price value
    await expect(this.modalPurchasePriceText).toBeVisible();
    const actualPriceText = await this.modalPurchasePriceText.textContent();

    // Check Format
    expect(isPriceInCurrencyFormat(actualPriceText), `Purchase price '${actualPriceText}' format incorrect`).toBe(true);

    // Deep Numerical Comparison (Handles 25000 vs 25,000.00)
    if (actualPriceText) {
      const actualNum = parseFloat(actualPriceText.replace(/[^0-9.-]+/g, ""));
      const expectedNum = parseFloat(purchaseAmount.replace(/[^0-9.-]+/g, ""));
      expect(actualNum, "Numerical purchase price mismatch").toBe(expectedNum);
    }

    // 4. Validate Duty Payable
    await expect(this.modalDutyPayableText).toBeVisible();
    const dutyText = await this.modalDutyPayableText.textContent();

    // Ensure it's not $0.00 (unless expected) and follows currency format
    expect(isPriceInCurrencyFormat(dutyText), `Duty payable '${dutyText}' format incorrect`).toBe(true);

    const dutyNum = parseFloat(dutyText?.replace(/[^0-9.-]+/g, "") || "0");
    expect(dutyNum, "Duty payable should be greater than zero").toBeGreaterThan(0);
  }

  /**
   * Closes the result modal and waits for it to be removed from the view.
   */
  async closeModal() {
    await this.modalCloseBtn.click();
    await expect(this.modalContainer).toBeHidden();
  }
}
