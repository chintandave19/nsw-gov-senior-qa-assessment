module.exports = {
  default: {
    formatOptions: {
      snippetInterface: "async-await",
    },
    paths: ["src/features/**/*.feature"],
    dryRun: false,
    require: ["src/steps/**/*.ts", "src/pages/**/*.ts", "src/utils/hooks.ts"],
    requireModule: ["ts-node/register"],
    format: ["progress-bar", "json:test-results/cucumber_report.json", "html:test-results/cucumber_report.html"],
    parallel: 1,
    tags: "not @ignore",
  },
};
