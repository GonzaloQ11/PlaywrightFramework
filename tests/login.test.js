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
        await loginPage.login("Admin", "fail");
        expect(await loginPage.isErrorMessageDisplayed()).toBe(true);
        expect(await loginPage.getErrorMessage()).toBe("Invalid credentials");
    });

    test('User can login after a failed attempt', async () => {
        await loginPage.go();
        expect(await loginPage.isLoginPageDisplayed()).toBe(true);
        await loginPage.login("Admin", "fail");
        expect(await loginPage.isErrorMessageDisplayed()).toBe(true);
        expect(await loginPage.getErrorMessage()).toBe("Invalid credentials");
        await loginPage.login("Admin", "admin123");
        expect(await dashboardPage.isDashboardPageDisplayed()).toBe(true);
      });
});
