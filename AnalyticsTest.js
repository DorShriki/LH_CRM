const BasePage = require('./BasePage')
const Analytics = require('./Analytics')
const Home = require('./Home')
const Actions = require('./Actions')

class AnalyticsTest{
    constructor(){
        this.selenium = new BasePage().selenium
        this.analytics = new Analytics(this.selenium)
        this.home = new Home(this.selenium)
        this.actions = new Actions(this.selenium)
    }
    //** Main method - run all the test cases **/
    async runTest(){
        await this.home.navigateToHomePage() // Open LH's CRM Website
        await this.home.clickOn('Analytics') // Nevigate to analytics page
        await this.getEmailSent() // Functional test
        await this.getOutstandingClients() // Functional test
        await this.hottestCountry() // Functional test
        await this.selenium.close() // Close browser
    }

    // Functional test - Sent an email and validate increase email sent
    async getEmailSent(){
        const beforeSent = await this.analytics.getEmailSent() // Get number of email sent 
        await this.home.clickOn('Actions') // Nevigate to actions page
        await this.actions.updateClient('Dor Shriki' , null , 'B') // Send email to client
        await this.home.clickOn('Analytics') // Back to analytics page
        const afterSent = await this.analytics.getEmailSent() // Get new number of email sent
        if(beforeSent < afterSent){ // Equal between numbers and print result
            return console.log("Email sent function is work!")
        }
        return console.log("Email sent function doesn't work!")
    }
    
    // Functional test - Mark 'Sold' to a client and validate decrease number of outstanding clients
    async getOutstandingClients(){
        const before = await this.analytics.getOutstandingClients() // Get number of outstanding clients
        await this.home.clickOn('Actions') // Nevigate to actions page
        await this.actions.updateClient('Dor Shriki' , null , null , true) // Mark 'Sold' to client
        await this.home.clickOn('Analytics') // Back to analytics page
        const after = await this.analytics.getOutstandingClients() // Get new number of outstanding clients
        if(before > after){ // Equal between numbers and print result
            return console.log("Outstanding client function is work!")
        }
        return console.log("Outstanding client function doesn't work!")
    }

    // Functional test - Validate that the hottest country is realy the country with the most clients
    async hottestCountry(){
        await this.analytics.hottestCountry()
    }
}

const analytic = new AnalyticsTest()
analytic.runTest()

