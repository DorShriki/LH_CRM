class Actions {
    constructor(selenium) {
	    this.selenium = selenium
	}

    //** Update client - insert client name and values to change -> owner , emailType , if sold (true/false) **/
    async updateClient(client , owner = null , emailType = null , sold = false){
        const updateElement = await this.selenium.findElementBy("className" , "update-container") // get update client WebElement
        await this.selenium.write(client , "css" , "input[list='names']" , null , updateElement) // insert client name 
        
        if(owner){ // insert owner and valid popup
            await this.selenium.write(owner , 'css' , `input[list='owner']` , null , updateElement)
            await this.selenium.clickElement('css' , `input[value='Transfer']` , null , updateElement)
            await this.popUp()
        }
        if(emailType){ // insert emailType and valid popup
            await this.selenium.write(emailType , 'css' , `input[list='emailType']` , null , updateElement)
            await this.selenium.clickElement('css' , `input[value='Send']` , null , updateElement)
            await this.popUp()
        }
        if(sold){ // click on sold and valid popup
            await this.selenium.clickElement('css' , `input[value='Sold']` , null , updateElement)
            await this.popUp()
        }
    }

    //** Add new client **/
    async addClient(Fname , Lname , country , owner , email){
        await this.selenium.write(Fname , 'id' , 'firstName') // insert first name
        await this.selenium.write(Lname , 'id' , 'lastName') // insert last name
        await this.selenium.write(country , 'id' , 'country') // insert country
        await this.selenium.write(owner , 'css' , 'input#owner') // insert owner
        await this.selenium.write(email , 'id' , 'email') // insert email
        await this.selenium.clickElement('className' , 'add-client-btn') // click 'add' button
    }

    //** Validate popup results --> return true or false **/
    async popUp(){
        const success = await this.selenium.findElementBy('className' , 'success-pop-up') // get success WebElement popup
        if(success){
            console.log(`Popup alert: 'UPDATE SUCCESSFUL'`)
            return true
        }

        const error = await this.selenium.findElementBy('className' , 'error-pop-up') // get error WebElement popup
        if(error){
            console.log(`Popup alert: 'SOME DETAILS ARE MISSING'`)
            return false
        }
        console.log(`Popup didn't appeared.`) // if both success and error popup didn't appered return error
        return false
    }
}

module.exports = Actions