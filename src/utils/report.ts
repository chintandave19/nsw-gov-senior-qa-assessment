/**
 * Post-test execution script to generate a consolidated HTML report.
 * This script transforms the raw JSON output from Cucumber-JS into a user-friendly
 * visual dashboard including screenshots, metadata, and trend data.
 */
const report = require("multiple-cucumber-html-reporter");
const path = require("path");

/**
 * Configuration for the HTML report generator.
 * @see {@link https://github.com/wswebcreation/multiple-cucumber-html-reporter#options}
 */
report.generate({
  jsonDir: "./test-results/",
  reportPath: "./test-results/report/",
  openReportInBrowser: false,
  displayDuration: true,
  metadata: {
    browser: {
      name: "chrome",
      version: "latest",
    },
    device: "QA Machine",
    platform: {
      name: "OSX/Linux",
      version: "Latest",
    },
  },
  customData: {
    title: "Execution Info",
    data: [
      { label: "Project", value: "NSW Gov Assessment" },
      { label: "Cycle", value: "Sprint 1" },
    ],
  },
});
