import { setWorldConstructor, World, IWorldOptions } from "@cucumber/cucumber";
import { BrowserContext, Page, APIRequestContext, APIResponse } from "@playwright/test";
import { StampDutyPage } from "../pages/StampDutyPage";
import { CalculatorPage } from "pages/CalculatorPage";

/**
 * CustomWorld serves as the shared state container between Cucumber steps
 * It manages the lifecycle of browser contexts, pages, API requests,
 * and Page Object Model (POM) initializations.
 */
export class CustomWorld extends World {
  context?: BrowserContext; // Playwright browser context
  page?: Page; // Playwright page instance for UI interactions

  /* API Specific Properties */
  api?: APIRequestContext; // Context for executing API requests
  apiResponse?: APIResponse; // Stores the response from the last executed API
  apiData?: any; // Stores the parsed JSON or data payload from API response

  /* Page Objects (UI) */
  stampDutyPage?: StampDutyPage;
  calculatorPage?: CalculatorPage;

  /**
   * Initializes the CustomWorld instance
   * @param options
   */
  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);
