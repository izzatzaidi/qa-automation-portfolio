# QA Automation Portfolio

![Playwright Tests](https://github.com/izzatzaidi/qa-automation-portfolio/actions/workflows/playwright.yml/badge.svg)

End-to-end UI and API test automation built with Playwright and TypeScript.

- **UI tests** run against [Sauce Demo](https://www.saucedemo.com), a demo e-commerce site
- **API tests** run against [JSONPlaceholder](https://jsonplaceholder.typicode.com), a free fake REST API
- **CI** runs every test on each push with GitHub Actions

## What's covered

| Area | Tests | Examples |
|---|---|---|
| Login | 5 | valid login, wrong password, locked-out user, empty fields |
| Inventory | 5 | product count, add/remove from cart, sort by price and name |
| Cart | 3 | item shown, remove item, cart persists |
| Checkout | 5 | full order, required-field validation, total = subtotal + tax |
| API | 7 | GET, POST, PUT, DELETE, filtering, 404 handling |

## Design decisions

- **Page Object Model:** locators and actions live in `pages/`, so tests read like plain steps
- **Custom fixture:** `inventoryPage` logs in before the test, so tests don't repeat login steps
- **Test IDs:** uses the site's `data-test` attributes instead of fragile CSS selectors
- **No hard waits:** relies on Playwright's auto-waiting and web-first assertions
- **Test data** is kept separate in `test-data/`

## Project structure

```
├── .github/workflows/playwright.yml
├── fixtures/fixtures.ts
├── pages/
├── test-data/
├── tests/
│   ├── ui/
│   └── api/
└── playwright.config.ts
```

## Run it locally

```bash
git clone https://github.com/izzatzaidi/qa-automation-portfolio.git
cd qa-automation-portfolio
npm install
npx playwright install chromium
npx playwright test
```

Handy commands:

```bash
npx playwright test --ui        # interactive UI mode
npx playwright test tests/api   # API tests only
npx playwright show-report      # open the HTML report
```
