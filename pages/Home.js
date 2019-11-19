class Home {
    constructor(selenium , logger) {
        this.selenium = selenium
        this.logger = logger
	}

    async navigateToHomePage() {
        await this.selenium.getURL("https://lh-crm.herokuapp.com/")
    }

    async clickOn(pageName){
        await this.selenium.clickElement('css' , `.nav-btn[value='${pageName}']`)
    }
}

module.exports = Home
