import BasePage from './BasePage';

export default class LoginPage extends BasePage {
    $usernameInput = '[name="username"]';

    $passwordInput = '[name="password"]';

    $loginButton = 'button[type="submit"]';

    $errorMessageContainer = '#spanMessage';

    async go() {
      await this.navigate('');
    }
    
    async isLoginPageDisplayed() {
      const isLoginButtonDisplayed = await this.isDisplayed(this.$loginButton);
      const isUsernameInputDisplayed = await this.isDisplayed(this.$usernameInput);
      const isPasswordInputDisplayed = await this.isDisplayed(this.$passwordInput);
      return isLoginButtonDisplayed && isUsernameInputDisplayed && isPasswordInputDisplayed;
    }

    async login(username, password) {
      await this.typeUsername(username);
      await this.typePassword(password);
      await this.clickLoginButton();
    }

    async typeUsername(username) {
      await this.page.fill(this.$usernameInput, username);
    }

    async typePassword(password) {
      await this.page.fill(this.$passwordInput, password);
    }

    async clickLoginButton() {
      await this.page.click(this.$loginButton);
    }

    async isErrorMessageDisplayed() {
      return this.isDisplayed(this.$errorMessageContainer);
    }
    
    async getErrorMessage() {
      return this.getText(this.$errorMessageContainer);
    }
}
