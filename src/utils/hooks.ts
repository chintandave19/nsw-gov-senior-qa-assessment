/**
 * This file defines the global and scenario-level setup and teardown logic for Cucumber tests
 * It manages the lifecycle of the Playwright browser, contexts, and Page Object initializations
 */
import { Before, After, BeforeAll, AfterAll, Status, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium, request, Browser } from "@playwright/test";
import { CustomWorld } from "../fixtures/fixture";
import { StampDutyPage } from "../pages/StampDutyPage";
import { CalculatorPage } from "../pages/CalculatorPage"; // Import this!
import * as dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Set global timeout for all Cucumber steps (30 seconds)
//setDefaultTimeout(30 * 1000);

// Shared browser instance across all scenarios in the test suite
let browser: Browser;

/**
 * Global setup: Launches the browser once before the entire test suite starts
 * Respects the 'HEADLESS' environment variable to toggle UI visibility
 */
BeforeAll(async function () {
  browser = await chromium.launch({ headless: process.env.HEADLESS === "true" });
});

/**
 * Scenario setup: Executes before every individual test case
 * 1. Establishes browser isolation via newContext
 * 2. Initializes the Page instance
 * 3. Instantiates Page Object Models (POMs) for use in steps
 * 4. Configures the API request context for non-UI testing
 */
Before(async function (this: CustomWorld) {
  // Create a new context and page for each scenario
  this.context = await browser.newContext();
  this.page = await this.context.newPage();

  // Initialize Page Objects with the current page instance
  this.stampDutyPage = new StampDutyPage(this.page);
  this.calculatorPage = new CalculatorPage(this.page);

  // Initialize API Context with base URL and default headers
  this.api = await request.newContext({
    baseURL: process.env.API_BASE_URL,
    extraHTTPHeaders: {
      Accept: "application/json",
    },
  });
});

/**
 * Scenario teardown: Executes after every individual test case
 * 1. Captures and attaches a screenshot to the report if a UI scenario fails
 * 2. Disposes of API, Page, and Context instances to free up resources
 * * @param {Object} scenario - Data provided by Cucumber of current scenario results
 */
After(async function (this: CustomWorld, scenario) {
  // UI Failure: Attach Screenshot
  if (scenario.result?.status === Status.FAILED && this.page) {
    const img = await this.page.screenshot({
      path: `./test-results/screenshots/${scenario.pickle.name.replace(/\s+/g, "_")}.png`,
      fullPage: true,
    });

    // Attach the screenshot to the Cucumber JSON/HTML report
    await this.attach(img, "image/png");
  }

  // Teardown
  await this.page?.close();
  await this.context?.close();
  await this.api?.dispose();
});

/**
 * Global teardown: Closes the browser instance after all tests have completed
 */
AfterAll(async function () {
  await browser.close();
});
