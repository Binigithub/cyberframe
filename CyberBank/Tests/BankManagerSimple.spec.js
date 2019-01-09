
// require('../Utilities/CustomLocators.js')

// describe('Login',()=>{

//     beforeEach(()=>{

//         browser.get('http://www.way2automation.com/angularjs-protractor/banking/#/login');

//     });

//     it('should have correct page title',()=>{

//         expect(browser.getTitle()).toEqual('Protractor practice website - Banking App');

//     });

//     it('should display homepage header',()=>{

//         expect($('button.home').isDisplayed()).toBe(true);

//         expect($('button.home').getText()).toEqual('Home'); 

//     });

//     it('should display page header',()=>{

//         expect($('.mainHeading').isDisplayed()).toBe(true);

//         expect($('.mainHeading').getText()).toEqual('XYZ Bank'); 

//     });

//     it('should display page header',()=>{

//         expect($('.mainHeading').isDisplayed()).toBe(true);

//         expect($('.mainHeading').getText()).toEqual('XYZ Bank'); 

//     });

    

//     //to create locator by using ng-click, we need to import

//     //so we create CustomLocators.js file and 

//     //add this --> require('../Utilities/CustomLocators.js') to the top

//     it('should display page header',()=>{

//         expect(element(by.ngClick('manager()')).isDisplayed()).toBe(true);

//         expect(element(by.ngClick('manager()')).getText()).toEqual('Bank Manager Login'); 

//     });

//     it('should stay at the home page when Home Button is clicked',()=>{

//         $('button.home').click();

//         expect(browser.getTitle()).toEqual('Protractor practice website - Banking App')

//         expect(element(by.ngClick('manager()')).getText()).toEqual('Bank Manager Login'); 

//     });
//     it('should login as Bank Manager',()=>{

//         element(by.ngClick('manager()')).click();

//         expect(element(by.ngClick('addCust()')).isDisplayed()).toBe(true); 

//     });

// });



require('../Utilities/CustomLocators.js');

var HomePage =  require('../Pages/Home.page.js');

var BankManagerPage = require('../Pages/BankManager.page.js');

var Base = require('../Utilities/Base.js');

var AddCustomerPage = require('../Pages/AddCustomerPage.page.js');
var Customers = require('../Pages/Customers.page.js');
var BankData =require('../TestData/BankData.json');

describe('Bank Manager', () => {

    
    describe('Manager Login', () => {

    beforeEach(function(){

        Base.navigateToHome();

    });

        it('should have correct page title', () => {

        expect(browser.getTitle()).toEqual("Protractor practice website - Banking App");

        });

        it('should display home button', () => {

            expect(HomePage.homeButton.isDisplayed()).toBe(true);

            expect(HomePage.homeButton.getText()).toEqual('Home');

        });

        it('should display page header', () => {

            expect(HomePage.pageHeader.isDisplayed()).toBe(true);

            expect(HomePage.pageHeader.getText()).toEqual(BankData.appData.bankName);

        });



        it('should display login option for Bank Manager', () => {

            expect(HomePage.managerLoginButton.isDisplayed()).toBe(true);

            expect(HomePage.managerLoginButton.getText()).toEqual('Bank Manager Login');

        });



        it('should stay at the homepage when Home Button is clicked', () => {

            HomePage.homeButton.click();

            expect(browser.getTitle()).toEqual('Protractor practice website - Banking App');

            expect(HomePage.managerLoginButton.getText()).toEqual('Bank Manager Login');

        });



        it("should login as Bank Manager",function(){  

            HomePage.managerLoginButton.click();

            expect(BankManagerPage.addCustomerButton.isDisplayed()).toBe(true);

        }) ;



        it('should display  options for manager', () => {

            HomePage.managerLoginButton.click();

            expect(BankManagerPage.addCustomerButton.isDisplayed()).toBe(true);

            expect(BankManagerPage.openAccountButton.isDisplayed()).toBe(true);

            expect(BankManagerPage.openAccountButton.getText()).toEqual('Open Account');

            expect(BankManagerPage.customersButton.isDisplayed()).toBe(true);

        });





        it('should navigate back to home page from Manager Login Page', () => {

            HomePage.managerLoginButton.click();

            HomePage.homeButton.click();

            expect(HomePage.managerLoginButton.getText()).toEqual('Bank Manager Login');

        });



});



describe('Adding a Customer', () => {

    beforeAll(function(){

        Base.navigateToHome();

        HomePage.managerLoginButton.click();

        AddCustomerPage.goToAddCustomer();

    });

    it('should display form for Adding Customer', () => {

        expect(AddCustomerPage.customerForm.isDisplayed()).toBe(true);

        expect(AddCustomerPage.formLabels.count()).toEqual(3);

    });

    it('should list all the labels', () => {

        expect(AddCustomerPage.formLabels.get(0).getText()).toEqual('First Name :');

        expect(AddCustomerPage.formLabels.get(1).getText()).toEqual('Last Name :');

        expect(AddCustomerPage.formLabels.get(2).getText()).toEqual('Post Code :');

    });

    it('should require firstname', () => {

        expect(AddCustomerPage.formRequiredFields.get(0)

        .getAttribute('required')).toEqual('true');

    });

    it('should require lastname', () => {

        expect(AddCustomerPage.formRequiredFields.get(1)

        .getAttribute('required')).toEqual('true');

    });

    it('should require postcode', () => {

        expect(AddCustomerPage.formRequiredFields.get(2)

        .getAttribute('required')).toEqual('true');

    });

    it('should add customer', () => {

        for(let i=0;i<BankData.customers.length;i++){

        AddCustomerPage.firstNameInputBox.sendKeys(BankData.customers[i].fName);

        AddCustomerPage.lastNameInputBox.sendKeys(BankData.customers[i].lName);

        AddCustomerPage.postalCodeInputBox.sendKeys(BankData.customers[i].pCode);

        AddCustomerPage.formAddCustomerButton.click();

        expect(browser.switchTo().alert().getText()).

        toContain('Customer added successfully with customer id :');

        browser.switchTo().alert().accept();

        }

    });

    

    it('should display new customer first name in list', () => {

        BankManagerPage.customersButton.click();

        expect(Customers.getLastRowValue(1).getText()).toEqual(BankData.customers[2].fName);

    });

    it('should display new customer last name in list', () => {

        // BankManagerPage.customersButton.click();

        expect(Customers.getLastRowValue(2).getText()).toEqual(BankData.customers[2].lName);

    });

    it('should display new customer post code in list', () => {

        // BankManagerPage.customersButton.click();

        expect(Customers.getLastRowValue(3).getText()).toEqual(BankData.customers[2].pCode);



});

//negative test case

it('should have no account number for the user that was created', () => {

	expect(Customers.getLastRowValue(4).getText()).toEqual('');

});

});

});

