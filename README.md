# 🎭 Playwright + TypeScript + Cucumber Framework

![Playwright](https://img.shields.io/badge/playwright-%232EAD33.svg?style=for-the-badge&logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Cucumber](https://img.shields.io/badge/Cucumber-white?style=for-the-badge&logo=cucumber&logoColor=23D96C)

This repository contains test automation framework designed for **UI (GUI)** and **API** testing. It utilizes Playwright for high-speed browser automation and API interactions, with Cucumber for BDD-integration and living documentation.

---

## 📝 Project Metadata

| Detail           | Information        |
| :--------------- | :----------------- |
| **Author**       | Chintankumar Dave  |
| **Organization** | Revenue NSW        |
| **Assessment**   | Senior QA Engineer |
| **Version**      | 1.0.0              |
| **Last Updated** | February 2026      |
| **License**      | MIT                |

---

## 🚀 Key Features

- **Cross-Layer Testing**: Unified framework for Web UI and REST API validation.
- **Environment Management**: Secure configuration using `.env` for multi-environment (Dev/QA/Prod) support.
- **Senior QA Design Patterns**:
  - **Page Object Model (POM)**: Enhanced with base classes for reusability.
  - **Custom World**: Centralized state management for step-to-step data sharing.
- **Enhanced Reporting**:
  - Automatic full-page screenshots on UI failure.
  - Consolidated HTML dashboards for stakeholders.
- **CI/CD Ready**: Native support for GitHub Actions with artifact retention.

---

## 🛠️ Architecture Overview

- **Cucumber**: Handles the Gherkin layer and test orchestration.
- **Playwright**: The engine for browser manipulation and API request contexts.
- **Axe-Core**: Integrated for automated accessibility audits.
- **Multiple Cucumber HTML Reporter**: Generates deep-dive visual reports.

---

## 📋 Prerequisites

- **Node.js**: `v18.0.0+`
- **npm**: `v9.0.0+`
- **VS Code Extensions**: Cucumber (Gherkin) and ESLint (recommended).

---

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Install Playwright Browsers:**
   For the demo purpose, we are only using Chromium.
   ```bash
   npm run install:browsers
   ```
4. **Environment Configuration:**
   Create a .env file in the root directory:
   ```bash
   BASE_URL=[https://www.service.nsw.gov.au](https://www.service.nsw.gov.au)
   API_BASE_URL=[https://openlibrary.org](https://openlibrary.org)
   HEADLESS=true
   ```

---

## 🚀 Execution Commands

This framework uses standard `npm` scripts to trigger different test suites. You can append additional Cucumber flags (like `--tags`) to any of these commands for more granular control.

| Command                    | Description                                   | Target / Tag    |
| :------------------------- | :-------------------------------------------- | :-------------- |
| `npm run test`             | Executes the full test suite (UI & API)       | All Scenarios   |
| `npm run test:ui`          | Triggers only browser-based tests             | `@ui`           |
| `npm run test:api`         | Triggers only REST API validation tests       | `@api`          |
| `npm run report`           | Processes JSON results into an HTML dashboard | `./report.js`   |
| `npm run clean`            | Purges old screenshots and report artifacts   | `/test-results` |
| `npm run install:browsers` | Downloads necessary Playwright binaries       | Chromium        |

---

### 💡 Advanced Execution Tips

**Running with a visible browser (Headed):**
By default, the framework runs in Headless mode for speed. To watch the execution:

```bash
HEADLESS=false npm run test:ui
```

---

## 📊 Reporting and Debugging

The framework is configured to provide maximum visibility into failures:

- Screenshots: Located in test-results/screenshots/.

- HTML Dashboard: Open test-results/report/index.html after a run.

- API Logs: In the HTML report, expand a failed API step to see the request URL and the JSON response body that triggered the failure

---

## 📂 Project Structure

```text
├── .github/workflows/           # GitHub Actions CI/CD pipeline definitions
├── tests/
│   ├── features/                # BDD Gherkin specifications (.feature files)
│   ├── fixtures/                # CustomWorld & dependency injection for state management
│   ├── pages/                   # Page Object Models (POM) - Locators and UI actions
│   ├── steps/                   # TypeScript step definitions (Glue code)
│   └── utils/                   # Test hooks (Before/After) and utility helpers
├── test-results/                # Test artifacts (Screenshots, Trace files, JSON reports)
├── .env                         # Environment variables and secrets (Git-ignored)
├── cucumber.js                  # Cucumber-js framework configuration
├── Jenkinsfile                  # Jenkins pipeline definition
├── package.json                 # Project dependencies and custom npm scripts
├── playwright.config.json       # Playwright configurations
├── README.md                    # Project documentation and setup guide
└── tsconfig.json                # TypeScript compiler configuration
```

---
