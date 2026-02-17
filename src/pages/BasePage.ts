import { Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/**
 * Base Page Object Class that provides common functionality
 * for all other Page Objects in the framework.
 */
export class BasePage {
  protected page: Page;
  private readonly baseUrl: string; // Defining baseUrl as an option here (if not defined in playwright.config.ts)

  /**
   * Initializes a new instance of the BasePage class
   * @param page
   */
  constructor(page: Page) {
    this.page = page;
    // Load from .env file or default to empty string to prevent undefined errors
    this.baseUrl = process.env.BASE_URL || "";
  }

  /**
   * Navigates the browser to a specific path or full URL
   * @param path - The destination path or full URL string
   */
  async navigateTo(path: string) {
    if (!this.baseUrl && !path.startsWith("http")) {
      throw new Error("BASE_URL is not defined and a relative path was provided.");
    }

    // Basic URL construction to prevent double-slash issues
    const targetUrl = path.startsWith("http") ? path : `${this.baseUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;

    console.log(`Navigating to: ${targetUrl}`);
    await this.page.goto(targetUrl, { waitUntil: "domcontentloaded" });
  }

  /**
   * Performs an automated accessibility scan of the current page state using Axe-core.
   * Logs violations to the console for debugging purposes.
   */
  async performAccessibilityCheck(): Promise<void> {
    const accessibilityScanResults = await new AxeBuilder({ page: this.page }).analyze();
    if (accessibilityScanResults.violations.length > 0) {
      console.error("Accessibility Violations Found: ");
      accessibilityScanResults.violations.forEach((violation) => {
        console.error(`- ${violation.id}: ${violation.description}`);
        violation.nodes.forEach((node) => {
          console.error(`  - Target: ${node.target.join(", ")}`);
          console.error(`    Failure Summary: ${node.failureSummary}`);
        });
      });
    } else {
      console.log("No accessibility violations found.");
    }
  }
}
