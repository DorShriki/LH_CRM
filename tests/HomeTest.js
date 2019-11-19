const BasePage = require("../BasePage");
const Home = require("../pages/Home")

class HomeTest {
    constructor() {
        this.basePage = new BasePage()
        this.selenium = this.basePage.selenium
        this.logger = this.basePage.logger
        this.home = new Home(this.selenium)
    }
    async runTest(){
        this.logger.info("Start testing 'Home page'")
        this.home.navigateToHomePage()
        this.home.clickOn('Analytics')
        this.selenium.close()
        this.logger.info("Finish testing 'Home page'")
    }
   
}

let homeTest = new HomeTest()
homeTest.runTest()