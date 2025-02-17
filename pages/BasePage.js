import { Page } from '@playwright/test';

export default class BasePage {
    #BASE_URL = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

    #loadingPage = 'html[class="fontawesome-i2svg-active fontawesome-i2svg-complete"]'

    /** @type {Page} */
    page;

    constructor(page) {
      this.page = page;
    }

    setPage = async  (page) => this.page = page;

    navigate = async (url) => await this.page.goto(`${this.#BASE_URL}${url}`);

    getElementProperty = async (selector, property) => await this.page.$eval(selector, (element, prop) => element[prop], property);

    getText = async (selector) => await this.getElementProperty(selector, 'textContent');
    
    getValue = async (selector) => await this.getElementProperty(selector, 'value');
  
    async isDisplayed(selector, { timeout = 5000 } = { }) {
      try {
        await this.page.waitForSelector(selector, { timeout });
        return true;
      } catch (error) {
        return false;
      }
    }
    
    waitForPageLoaded = async () => await this.page.waitForSelector(this.#loadingPage);
    
    getElementsProperties = async (selector, property) => await this.page.$$eval(selector, (elements, prop) => elements.map((e) => e[prop]), property);

    async selectByOptionText(dropdownSelector, option) {
      const optionTexts = await this.getElementsProperties(`${dropdownSelector} option`, 'textContent');
      const index = optionTexts.indexOf(option);
      const optionValues = await this.getElementsProperties(`${dropdownSelector} option`, 'value');
      await this.page.select(dropdownSelector, optionValues[index]);
    }
}
