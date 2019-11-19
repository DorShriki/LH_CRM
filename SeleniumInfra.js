const {Builder, By, Key , until} = require('selenium-webdriver');
const path = require('chromedriver').path;
const chrome = require('selenium-webdriver/chrome');
let service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);

class SelenuimInfra{
    constructor(logger){
        this.driver = new Builder().forBrowser('chrome').build();
        this.logger = logger
    }

    async getURL(URL){ // Open browser
        await this.driver.get(URL)
        // await this.driver.manage().window().maximize()
    }

    async close(){ // Close browser
        setTimeout(()=>{
            this.driver.quit()
        }, 1000)
    }

    async validURL(pageName){ // Compare convert and wanted URL
        if(await this.driver.wait(until.urlContains(pageName) , 10000)){
            return this.logger.debug("This Is The Right URL")
        }
        return this.logger.debug("Wrong! This Is Worng URL")
    }

// Click on element
    async clickElement(locatorType , locatorValue , element = null , fromElement = null) {
        try {
            if(!element){
                if(fromElement){
                    element = await fromElement.findElement(By[locatorType](locatorValue))
                }else{
                    element = await this.driver.findElement(By[locatorType](locatorValue))
                }
            }
            await this.driver.sleep(1000)
            await element.click()
            await this.driver.sleep(1000)
            this.logger.debug(`Clicked on element with ${locatorType} = ${locatorValue}`)
        }
        catch (error) {
            this.logger.debug(`Got error while trying to click on element with ${locatorType} = ${locatorValue} \n ${error}`)
        }
    }

// Send Keys To Element
    async write(data , locatorType , locatorValue , element = null , fromElement = null){
        try {
            if(!element){
                if(fromElement){
                    element = await fromElement.findElement(By[locatorType](locatorValue))
                }else{
                    element = await this.driver.findElement(By[locatorType](locatorValue))
                }
            }
            await element.sendKeys(data)
            this.logger.debug(`Send Keys (' ${data} ') to element with ${locatorType} = ${locatorValue} `)
        }
        catch (error) {
            this.logger.debug(`Got error while trying to send keys to element with ${locatorType} = ${locatorValue} \n ${error}`)
        }
    }

// Get text from element
    async getTextFromElement(locatorType , locatorValue , element = null , fromElement = null){
        try {
            if(!element){
                if(fromElement){
                    element = await fromElement.findElement(By[locatorType](locatorValue))
                }else{
                    element = await this.driver.findElement(By[locatorType](locatorValue))
                }
            }
            this.logger.debug(`Get text from element with ${locatorType} = ${locatorValue}`)
            return element.getText()
        }
        catch (error) {
            this.logger.debug(`Got error while trying to get text from element with ${locatorType} = ${locatorValue} \n ${error}`)
        }
    }

// Clear element field
    async clearElementField(locatorType , locatorValue , element = null , fromElement = null){
        try {
            if(!element){
                if(fromElement){
                    element = await fromElement.findElement(By[locatorType](locatorValue))
                }else{
                    element = await this.driver.findElement(By[locatorType](locatorValue))
                }
            }
            await this.driver.sleep(1000)
            await element.clear()
            this.logger.debug(`Clear text from element with ${locatorType} = ${locatorValue} `)
        }
        catch (error) {
            this.logger.debug(`Got error while trying to clear text from element with ${locatorType} = ${locatorValue} \n ${error} `)
        }
    }

// Check if element exists
    async isElementExists(locatorType , locatorValue){
        try {
            let element = await this.driver.findElement(By[locatorType](locatorValue))
            if(element){
                return true
            }
            return false
        }
        catch(error){
            this.logger.debug(`Got error while trying to search element with ${locatorType} = ${locatorValue} \n ${error} `)
        }
    }

// Find and return element by type and value
    async findElementBy(locatorType , locatorValue , fromElement = null){
        let element
        try{
            if(fromElement){
                element = await fromElement.findElement(By[locatorType](locatorValue))
            }
            else{
                element = await this.driver.findElement(By[locatorType](locatorValue))
            }
            this.logger.debug(`Find element with ${locatorType} = ${locatorValue} `)
            return element
        }
        catch(error){
            this.logger.debug(`Got error while trying to find element with ${locatorType} = ${locatorValue} \n ${error}`)
        }

    }

// Find all the elements with the same type and value and return array(list)
    async findElementListBy(locatorType , locatorValue , fromElement = null){
        let elements
        try{
            if(fromElement){
                elements = await fromElement.findElements(By[locatorType](locatorValue))
            }
            else{
                elements = await this.driver.findElements(By[locatorType](locatorValue))
            }
            this.logger.debug(`Find elements list with ${locatorType} = ${locatorValue}`)
            return elements
        }
        catch{
            this.logger.debug(`Got error while trying to find element list with ${locatorType} = ${locatorValue} \n error`)
        }
    }
}

module.exports = SelenuimInfra