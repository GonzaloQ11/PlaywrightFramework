import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
const { test, expect } = require('@playwright/test');

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
      await loginPage.login("Admin", "admin123");
      expect(await dashboardPage.isDashboardPageDisplayed()).toBe(true);
    });
});
