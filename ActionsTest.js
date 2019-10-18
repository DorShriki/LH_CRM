const BasePage = require('./BasePage')
const Actions = require('./Actions')
const Home = require('./Home')
const Clients = require('./Clients')

class ActionsTest{
    constructor(){
        this.selenium = new BasePage().selenium
        this.actions = new Actions(this.selenium)
        this.home = new Home(this.selenium)
        this.clients = new Clients(this.selenium)
    }

    //** Main method - run all the test cases **/
    //** Notice - In line 22 'updateClient' is invoke with small letters which is wrong --> Negative test */
    async runTest(){
        await this.home.navigateToHomePage() // Open LH's CRM Website
        await this.home.clickOn('Actions') // Nevigate to actions page
        await this.addClient('Dor' , 'Shriki' , 'israel' , 'Janice Alvarado' , 'dorr@gmail.com') // Functional test
        await this.updateClient('Dor Shriki' , 'Jhon') // Functinal test
        await this.updateClient('dor shriki', 'Jhon') // Negative test
        await this.selenium.close() // Close browser
    }

    // Functional test - Update client and validate that client is updated
    async updateClient(name , owner , emailType , sold){ 
        await this.actions.updateClient(name , owner , emailType , sold) // Update client
        await this.home.clickOn('Clients') // Nevigate to clients page
        await this.clients.searchClient(name , 'name') // Search and validate that client is updated
        await this.home.clickOn('Actions') // Back to actions page
    }

    // Functional test - Add new client and validate that client is added
    async addClient(Fname , Lname , country , owner , email){
        await this.actions.addClient(Fname , Lname , country , owner , email) // Add new client
        await this.home.clickOn('Clients') // Nevigate to clients page
        await this.clients.searchClient(`${Fname} ${Lname}` , 'name') // Search and validate that clientd is added
        await this.home.clickOn('Actions') // Back to actions page
    }
}

const action = new ActionsTest()
action.runTest()
