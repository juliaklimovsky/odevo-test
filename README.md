# How to Install Cypress

First, make sure you have all the [system requirements](https://docs.cypress.io/guides/getting-started/installing-cypress#System-requirements).

## Install Cypress via npm

```bash
cd /your/project/path
```
```bash
npm install
```

Cypress autotests can be run in two ways:

1. **Headlessly.** Execute tests using the command line:
   ```bash
   npx cypress run
   ```

2. **Via the Cypress Test Runner with a graphical interface:**
   ```bash
   npx cypress open
   ```
   Select E2E testing, choose a browser, and click the 'Start E2E Testing' button.
