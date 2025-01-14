import BasePage from './BasePage';

export default class DashboardPage extends BasePage {
    $dashboardBox = '[class="oxd-topbar-header-title"]';

    async isDashboardPageDisplayed() {
      return this.isDisplayed(this.$dashboardBox);
    }
}
