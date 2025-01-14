import BasePage from './BasePage';

export default class LoginPage extends BasePage {
    #usernameInput = '[name="username"]';
    #passwordInput = '[name="password"]';
    #loginButton = 'button[type="submit"]';
    #inputErrorValidation = "[class*=oxd-input--error]"
    #errorMessageContainer = "p[class*=oxd-alert-content-text]"

    go = async () =>  await this.navigate('');
    
    async isLoginPageDisplayed() {
      const isLoginButtonDisplayed = await this.isDisplayed(this.#loginButton);
      const isUsernameInputDisplayed = await this.isDisplayed(this.#usernameInput);
      const isPasswordInputDisplayed = await this.isDisplayed(this.#passwordInput);
      return isLoginButtonDisplayed && isUsernameInputDisplayed && isPasswordInputDisplayed;
    }

    async login(username, password) {
      await this.typeUsername(username);
      await this.typePassword(password);
      await this.clickLoginButton();
    }

    typeUsername = async (username) => await this.page.fill(this.#usernameInput, username);

    typePassword = async (password) => await this.page.fill(this.#passwordInput, password);

    clickLoginButton = async () =>  await this.page.click(this.#loginButton);
    
    usernameIsRequiredErrorDisplayed = async () => await this.isDisplayed(this.#usernameInput + this.#inputErrorValidation)

    passwordIsRequiredErrorDisplayed = async () => await this.isDisplayed(this.#passwordInput + this.#inputErrorValidation)

    isErrorMessageDisplayed = async () => await this.isDisplayed(this.#errorMessageContainer);
    
    getErrorMessage = async () => await this.getText(this.#errorMessageContainer)
}
