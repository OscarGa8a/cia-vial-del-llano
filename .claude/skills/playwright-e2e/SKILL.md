---
name: playwright-e2e
description: Playwright E2E tests, page objects, best practices. Trigger: When writing E2E tests with Playwright.
license: MIT
compatibility: opencode
metadata:
  author: playwright-community
  version: "1.0.0"
  scope: [root]
  audience: developers
  framework: playwright
  auto_invoke:
    - "Writing E2E tests with Playwright"
    - "Creating page objects"
    - "Testing user flows"
allowed-tools: Read, Edit, Write, Glob, Grep
---

# Playwright E2E - End-to-End Testing

## What I do

I provide patterns for writing E2E tests with Playwright, including page objects and best practices.

## When to use me

Use this skill when:

- Writing E2E tests
- Creating page objects
- Testing user flows
- Testing across browsers

## Critical Patterns

### ALWAYS

- ✅ Use Page Object Model
- ✅ Use data-testid attributes
- ✅ Wait for elements properly
- ✅ Test critical user paths
- ✅ Run tests in headless mode in CI

### NEVER

- ❌ Use hardcoded waits (setTimeout)
- ❌ Rely on XPath selectors
- ❌ Test implementation details
- ❌ Skip error scenarios

## Pattern 1: Page Object

```typescript
// e2e/pages/login.page.ts
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByTestId('email-input');
    this.passwordInput = page.getByTestId('password-input');
    this.submitButton = page.getByTestId('submit-button');
    this.errorMessage = page.getByTestId('error-message');
  }

  async goto() {
    await this.page.goto('/auth/login');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async getErrorMessage(): Promise<string | null> {
    if (await this.errorMessage.isVisible()) {
      return this.errorMessage.textContent();
    }
    return null;
  }
}
```

## Pattern 2: E2E Test

```typescript
// e2e/tests/auth/login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';

test.describe('Login Flow', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    await loginPage.login('player@test.com', 'password123');

    // Assert navigation to player home
    await expect(page).toHaveURL('/player/home');
  });

  test('should show error with invalid credentials', async () => {
    await loginPage.login('invalid@test.com', 'wrong');

    // Assert error message
    const error = await loginPage.getErrorMessage();
    expect(error).toContain('Invalid credentials');
  });
});
```

## Commands

```bash
# Run all E2E tests
pnpm exec playwright test

# Run specific test file
pnpm exec playwright test e2e/tests/auth/login.spec.ts

# Run in headed mode (with browser UI)
pnpm exec playwright test --headed

# Run in debug mode
pnpm exec playwright test --debug
```

## Related Skills

- **Testing**: [angular-testing](../angular-testing/SKILL.md)

---

**Skill Version**: 1.0.0
**Last Updated**: January 2026
