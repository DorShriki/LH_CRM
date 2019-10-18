class Analytics {
    constructor(selenium) {
        this.selenium = selenium
    }

    //** Return number of emails that had sent to the clients **/
    async getEmailSent(){ 
        const info = await this.selenium.findElementListBy('className' , 'badge') // Get information WebElement
        return await this.selenium.getTextFromElement('className' , 'badge-val' , null , info[1]) // Return number of emailSent
    }

    //** Return how many clients are outstanding **/
    async getOutstandingClients(){ 
        const info = await this.selenium.findElementListBy('className' , 'badge') // Get information WebElement
        return await this.selenium.getTextFromElement('className' , 'badge-val' , null , info[2]) // Return number of outstanding clients
    }

    //** Validate if the hottest country is realy the hottest country **/
    async hottestCountry(){ 
        const salesDiv = await this.selenium.findElementBy('className' , 'sales-by-param-chart') // Get 'Sales by' WebElement
        const info = await this.selenium.findElementListBy('className' , 'badge') // Get information WebElement
        const hotCountry = await this.selenium.getTextFromElement('className' , 'badge-val' , null , info[3]) // Get hottest country

        const arrGTag = await this.selenium.findElementListBy('className' , `recharts-layer recharts-bar-rectangle` , salesDiv) // Get array with all the columns
        let biggest = 0 // Save the biggest number of sales
        let country = " " // Save the country with the biggest number of sales
        for(let g of arrGTag){ // Run over the array of columns
            await this.selenium.clickElement('tagName' , 'path' , null , g) // Click on each column
            let numOfSales = await this.selenium.getTextFromElement('className' , 'recharts-tooltip-item-value') // Get num of sales
            let nameOfCountry = await this.selenium.getTextFromElement('className' , 'recharts-tooltip-label' , null , salesDiv) // Get country
            numOfSales = parseInt(numOfSales) // Save only numbers
            if(numOfSales > biggest){ // Equal between number of sales and the biggest number of sales
                biggest = numOfSales 
                country = nameOfCountry
            }
        }
        if(hotCountry == country){ // If the hottest country is the one with the most sales, return true. otherwise return false
            console.log(`${hotCountry} is the Hottest country!`)
            return true
        }
        console.log(`${hotCountry} is Not the hottest country! --> The real hottest country is ${country}`)
        return false
    }
}

module.exports = Analytics


