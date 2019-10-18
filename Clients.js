class Clients {
    constructor(selenium) {
	    this.selenium = selenium
	}

    //Get input and searchBy , return true or false if client exist
    async searchClient(input, searchBy){
        searchBy = searchBy.toLowerCase()
        input = input.toLowerCase()
        let table = []
        // Search client by input and searchBy
        const elm = await this.selenium.findElementBy('className', 'search-clients')
        await this.selenium.write(input , 'tagName' , 'input' , null , elm)
        await this.selenium.write(searchBy , 'tagName' , 'select' , null , elm)
        // Validate that client is exist
        table = await this.selenium.findElementListBy('className' , 'clientDetails')
        if(table.length < 1){ // if there is no values in 'table' --> there is no clients found
            console.log(`Cannot find value = '${input}' By '${searchBy}'`)
            await this.selenium.clearElementField('tagName' , 'input' , null , elm)
            return false
        }
        for(let row of table){ // run over clients how found
            const arrTH = await this.selenium.findElementListBy("tagName" , "th" , row)
            if(searchBy == 'name'){ // if search by name it validate that the input name is equal to result
                const name = (await this.selenium.getTextFromElement(null , null , arrTH[0])+
                await this.selenium.getTextFromElement(null , null , arrTH[1])).toLowerCase()
                input = input.split(' ').join('')
                await this.selenium.clearElementField('tagName' , 'input' , null , elm)
                if(name == input){
                    console.log(`Found value = '${input}' By '${searchBy}'`)
                    return true
                }
                console.log(`Cannot find value '${input}' By '${searchBy}'`)
                console.log(name +" , " + input)
                return false
            }

            if(searchBy == 'email'){  // if search by email it validate that the input name is equal to result
            const email = (await this.selenium.getTextFromElement(null , null , arrTH[3])).toLowerCase()
            if(email == input){
                console.log(`Found value = '${input}' By '${searchBy}'`)
                return true
            }
            console.log(`Cannot find value '${input}' By value = '${searchBy}"`)
            return false
            }
        }
        console.log(`Found several results for value '${input}' By '${searchBy}'`)
        return true
    }

    //** Edit client and validate editing **/
    async editClient(input , searchBy , newInput, editBy){
        await this.searchClient(input , searchBy) // search client
        // edit client
        await this.selenium.clickElement('className' , 'clientDetails') // click on client
        await this.selenium.clearElementField('id' , `${editBy}`) // clear wanted filed
        await this.selenium.write(newInput , 'id' , `${editBy}`) // insert value to wnated field
        await this.selenium.clickElement('className' , 'update-client-popup-btn') // click on 'update'
        await this.selenium.clickElement('className' , 'cancel-client-popup-btn') // click on 'close' 
        await this.selenium.clearElementField('xpath' , '//*[@id="root"]/div/div[4]/div[1]/input') // clear 'search' input
        const isEdit = await this.searchClient(newInput , editBy) // validate changes
        if(isEdit){
            console.log(`Client with value '${input}' By '${searchBy}' is edited to '${newInput}'`)
            return true
        }
        console.log(`Cannot edit client with value '${input}' By '${searchBy}'`)
        return false
    }

    // ** Delete Client and validate deleting **/
    async deleteClient(input , searchBy){
        await this.searchClient(input , searchBy) // search client
        await this.selenium.clickElement('className' , 'clientDetails') // click on client
        await this.selenium.clickElement('className' , 'delete-client-popup-btn') // click on 'delete'
        await this.selenium.clickElement('className' , 'cancel-client-popup-btn') // click on 'close'
        await this.selenium.clearElementField('xpath' , '//*[@id="root"]/div/div[4]/div[1]/input') // clear 'search' input
        const  isDeleted = await this.searchClient(input , searchBy) // search client
        if(!isDeleted){
            console.log(`Client with value '${input}' By '${searchBy}' is deleted`)
            await this.selenium.clearElementField('xpath' , '//*[@id="root"]/div/div[4]/div[1]/input') // clear 'search' input
            return true
        }
        console.log(`Cannot delete client with value '${input}' By '${searchBy}' is deleted`)
        await this.selenium.clearElementField('xpath' , '//*[@id="root"]/div/div[4]/div[1]/input') // clear 'search' input
        return false
    }
}

module.exports = Clients