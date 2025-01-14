export default class BasePage {
    BASE_URL = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

    $loadingPage = 'html[class="fontawesome-i2svg-active fontawesome-i2svg-complete"]'

    constructor(page) {
      this.page = page;
    }

    async setPage(page) {
      this.page = page;
    }

    async navigate(url) {
      await this.page.goto(`${this.BASE_URL}${url}`);
    }

    async getElementProperty(selector, property) {
      return this.page.$eval(selector, (element, prop) => element[prop], property);
    }

    async getText(selector) {
      return this.getElementProperty(selector, 'textContent');
    }
    
    async getValue(selector) {
      return this.getElementProperty(selector, 'value');
    }

    async isDisplayed(selector, { timeout = 5000 } = { }) {
      try {
        await this.page.waitForSelector(selector, { timeout });
        return true;
      } catch (error) {
        return false;
      }
    }
    
    async waitForPageLoaded() {
      await this.page.waitForSelector(this.$loadingPage);
    }
    
    async getElementsProperties(selector, property) {
      return this.page.$$eval(selector, (elements, prop) => elements.map((e) => e[prop]), property);
    }

    async selectByOptionText(dropdownSelector, option) {
      const optionTexts = await this.getElementsProperties(`${dropdownSelector} option`, 'textContent');
      const index = optionTexts.indexOf(option);
      const optionValues = await this.getElementsProperties(`${dropdownSelector} option`, 'value');
      await this.page.select(dropdownSelector, optionValues[index]);
    }
}
