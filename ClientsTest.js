const BasePage = require('./BasePage')
const Clients = require('./Clients')
const Home = require('./Home')

class ClientsTest{
    constructor(){
        this.selenium = new BasePage().selenium
        this.clients = new Clients(this.selenium)
        this.home = new Home(this.selenium)
    }

    //** Main method - run all the test cases **/
    //** Before statring , add a client called 'Dor Shriki'*/
    async runTest(){
        await this.home.navigateToHomePage() // Open LH's CRM Website
        await this.home.clickOn('Clients') // Nevigate to clients page
        await this.searchClient('dor shriki' , 'name') // Functinal test
        await this.editClient('dor shriki' , 'name' , 'Ness Client' , 'name') // Functional test
        await this.deleteClient('Ness Client' , 'name') // Functional test
        await this.selenium.close() // Close browser
    }

    // Fanctional test - search and validate client exist
    async searchClient(input , searchBy){
        await this.clients.searchClient(input , searchBy)
    }

    // Functional test - edit client and validate changes
    async editClient(input , searchBy , newInput , editBy){
        await this.clients.editClient(input , searchBy , newInput , editBy)
    }

    // Functional test - delete client and validate client is not exist anymore
    async deleteClient(input , searchBy){
        await this.clients.deleteClient(input,searchBy)
    }
}

const client = new ClientsTest()
client.runTest()