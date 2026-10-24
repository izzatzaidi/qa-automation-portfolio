import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { users } from '../../test-data/users';

test.describe('Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('logs in with valid credentials', async ({ page }) => {
    await loginPage.login(users.standard.username, users.standard.password);
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.getByTestId('title')).toHaveText('Products');
  });

  test('shows an error when the password is wrong', async () => {
    await loginPage.login(users.wrongPassword.username, users.wrongPassword.password);
    await expect(loginPage.errorMessage).toContainText('Username and password do not match');
  });

  test('blocks a locked out user', async () => {
    await loginPage.login(users.locked.username, users.locked.password);
    await expect(loginPage.errorMessage).toContainText('locked out');
  });

  test('shows an error when username is empty', async () => {
    await loginPage.loginButton.click();
    await expect(loginPage.errorMessage).toContainText('Username is required');
  });

  test('shows an error when password is empty', async () => {
    await loginPage.usernameInput.fill(users.standard.username);
    await loginPage.loginButton.click();
    await expect(loginPage.errorMessage).toContainText('Password is required');
  });
});