import { Given, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../../fixtures/fixture";
import { expect } from "@playwright/test";

Given("I fetch details for author {string}", async function (this: CustomWorld, authorId: string) {
  if (!this.api) throw new Error("API Context not initialized");

  const response = await this.api.get(`/authors/${authorId}.json`);

  expect(response.status(), `Failed to fetch author: ${response.statusText()}`).toBe(200);

  // Store state for subsequent steps
  this.apiResponse = response;
  this.apiData = await response.json();
});

Then("the {string} should be {string}", async function (this: CustomWorld, key: string, expectedValue: string) {
  expect(this.apiData, "No API data found").toBeDefined();

  // Supporting nested keys (e.g., "type.key") by traversing the JSON object
  const actualValue = key.split(".").reduce((obj, k) => obj?.[k], this.apiData);
  expect(actualValue).toEqual(expectedValue);
});

Then("the {string} should contain {string}", async function (this: CustomWorld, key: string, expectedValue: string) {
  expect(this.apiData, "No API data found").toBeDefined();
  const actualValue = this.apiData[key];

  if (Array.isArray(actualValue)) {
    const contains = actualValue.includes(expectedValue);
    expect(contains, `Expected array to contain '${expectedValue}', but got: ${JSON.stringify(actualValue)}`).toBe(
      true,
    );
  } else {
    expect(actualValue).toContain(expectedValue);
  }
});
