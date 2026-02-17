import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

/**
 * Page Object Model for the Service NSW Stamp Duty information page.
 */
export class StampDutyPage extends BasePage {
  private readonly pageTitle: Locator;
  private readonly checkOnlineBtn: Locator;

  /**
   * Initializes the StampDutyPage with Playwright locators
   * @param page
   */
  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator("#page-title");
    this.checkOnlineBtn = page.locator('.cta__action a[aria-label^="Check online"]');
  }

  /**
   * Navigates directly to the Service NSW Stamp Duty transaction page
   * Uses the relative path which is appended to the BASE_URL
   */
  async openStampDutyPage() {
    await this.navigateTo("/transaction/check-motor-vehicle-stamp-duty");
  }

  /**
   * Verifies that the page has loaded correctly by checking visibility of page title
   */
  async verifyPageTitle() {
    await expect(this.pageTitle).toBeVisible({ timeout: 10000 });
    expect(await this.pageTitle.textContent()).toContain("Check motor vehicle stamp duty");
  }

  /**
   * Clicks the "Check online" button.
   */
  async clickCheckOnline() {
    await this.checkOnlineBtn.waitFor({ state: "visible", timeout: 10000 });
    await this.checkOnlineBtn.click();
  }

  /**
   * Verifies that the user has been successfully redirected to the
   * external Revenue NSW calculator page.
   */
  async verifyRedirectedPage() {
    // Assert URL contains subsequent path to calculator page
    await expect(this.page).toHaveURL(/.*revenue.nsw.gov.au\/erevenue\/calculators\/motorsimple.php/);
  }
}
