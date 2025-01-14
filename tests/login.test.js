import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
const { test, expect } = require('@playwright/test');
const testData = require('../utils/data/login').default;

const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();

test.describe('Login Tests', () => {

  test.beforeEach(async ({ page }) => {
    await loginPage.setPage(page);
    await dashboardPage.setPage(page);
  });

  test('Login page is displayed', async ({page}) => {
      await loginPage.go();
      expect(await loginPage.isLoginPageDisplayed()).toBe(true);
    });

  test('User can login successfully', async () => {
      await loginPage.go();
      expect(await loginPage.isLoginPageDisplayed()).toBe(true);
      await loginPage.login(testData.user.username, testData.user.password);
      expect(await dashboardPage.isDashboardPageDisplayed()).toBe(true);
    });

    test('Username and Password cannot be empty', async () => {
        await loginPage.go();
        expect(await loginPage.isLoginPageDisplayed()).toBe(true);
        await loginPage.clickLoginButton();
        expect(await loginPage.usernameIsRequiredErrorDisplayed()).toBe(true);
        expect(await loginPage.passwordIsRequiredErrorDisplayed()).toBe(true);
    });
 
    test('Invalid credentials', async () => {
        await loginPage.go();
        expect(await loginPage.isLoginPageDisplayed()).toBe(true);
        await loginPage.login(testData.user.username, testData.user.invalidPassword);
        expect(await loginPage.isErrorMessageDisplayed()).toBe(true);
        expect(await loginPage.getErrorMessage()).toBe(testData.errorMessages.invalidCredentials);
    });

    test('User can login after a failed attempt', async () => {
        await loginPage.go();
        expect(await loginPage.isLoginPageDisplayed()).toBe(true);
        await loginPage.login(testData.user.username, testData.user.invalidPassword);
        expect(await loginPage.isErrorMessageDisplayed()).toBe(true);
        expect(await loginPage.getErrorMessage()).toBe(testData.errorMessages.invalidCredentials);
        await loginPage.login(testData.user.username, testData.user.password);
        expect(await dashboardPage.isDashboardPageDisplayed()).toBe(true);
    });
});
