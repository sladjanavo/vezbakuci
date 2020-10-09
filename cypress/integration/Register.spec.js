
/// <reference types="Cypress" />
const Locators = require("../fixtures/Locators.json")



describe("Testovi za register",()=>{

     let correctEmail = "vezba2@gmail.com"
     let CorrectEmail3 = "vezba3@gmail.com"
     let correctEmail4 = "vezba4@gmail.com"
     let correctPassword = "12345678"
     let FirstName1 = "Petar"
     let LastName1 = "Petrovic"
     let FirstName2 = "Marko"
     let LastName2 = "Markovic"
     let IncorrectEmail1 = "vezba2gmail.com"
     let IncorrectEmail2 = "vezba2@gcom"
     let usedEmail = "vezba1@gmail.com"
     let incorrectPassword1 = "aaaa"
     let incorrectPassword2 = "aaaaaaaa"

    beforeEach("visit link",()=>{
        cy.visit("/register")
        cy.url().should("contains","https://gallery-app.vivifyideas.com/")
    })



    /*it("Visit register page",()=>{
        cy.visit("https://gallery-app.vivifyideas.com/")
        cy.get(".nav-link").eq(2).click()
    })*/


    it("Create user without First Name",()=>{
        
        //cy.get(Locators.Header.Register).eq(2).click()
        cy.get(Locators.Register.Title).should("have.text","Register")
        cy.get(Locators.Register.LastName).type(LastName1)
        cy.get(Locators.Register.Email).type(correctEmail)
        cy.get(Locators.Register.Password).type(correctPassword)
        cy.get(Locators.Register.ConfirmPass).type(correctPassword)
        cy.get(Locators.Register.Checkbox).click()
        cy.get(Locators.Register.Submit).click()
        cy.get(Locators.Register.FirstName).then(($input)=>{
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })
    })

    it("Create user without Last Name",()=>{
        //cy.get(Locators.Header.Register).eq(2).click()
        cy.get(Locators.Register.FirstName).type(FirstName1)
        cy.get(Locators.Register.Email).type(correctEmail)
        cy.get(Locators.Register.Password).type(correctPassword)
        cy.get(Locators.Register.ConfirmPass).type(correctPassword)
        cy.get(Locators.Register.Checkbox).click()
        cy.get(Locators.Register.Submit).click()
        cy.get(Locators.Register.LastName).then(($input)=>{
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
    })

})
    
    it("Create user without password",()=>{
        //cy.get(Locators.Header.Register).eq(2).click()
        cy.get(Locators.Register.FirstName).type(FirstName2)
        cy.get(Locators.Register.LastName).type(LastName2)
        cy.get(Locators.Register.Email).type(CorrectEmail3)
        cy.get(Locators.Register.ConfirmPass).type(correctPassword)
        cy.get(Locators.Register.Checkbox).click()
        cy.get(Locators.Register.Submit).click()
        cy.get(Locators.Register.Password).then(($input)=>{
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
    })
        
    })

     it("Create user with incorrect email (without @)",()=>{
        //cy.get(Locators.Header.Register).eq(2).click()
        cy.get(Locators.Register.FirstName).type(FirstName1)
        cy.get(Locators.Register.LastName).type(LastName1)
        cy.get(Locators.Register.Email).type(IncorrectEmail1)
        cy.get(Locators.Register.Password).type(correctPassword)
        cy.get(Locators.Register.ConfirmPass).type(correctPassword)
        cy.get(Locators.Register.Checkbox).click()
        cy.get(Locators.Register.Submit).click()
        cy.get(Locators.Register.Email).then(($input)=>{
            expect($input[0].validationMessage).to.eq("Please include an '@' in the email address. 'vezba2gmail.com' is missing an '@'.")
     })


    })
            
    it("Create user with incorrect email (after '@')",()=>{
        //cy.get(Locators.Header.Register).eq(2).click()
        cy.get(Locators.Register.FirstName).type(FirstName1)
        cy.get(Locators.Register.LastName).type(LastName1)
        cy.get(Locators.Register.Email).type(IncorrectEmail2)
        cy.get(Locators.Register.Password).type(correctPassword)
        cy.get(Locators.Register.ConfirmPass).type(correctPassword)
        cy.get(Locators.Register.Checkbox).click()
        cy.get(Locators.Register.Submit).click()
        cy.get(Locators.Register.Alert).should("be.visible").and("have.text","The email must be a valid email address.")
     


    })
         


      it("Create user with existing email",()=>{

        //cy.get(Locators.Header.Register).eq(2).click()
        cy.get(Locators.Register.FirstName).type(FirstName1)
        cy.get(Locators.Register.LastName).type(LastName1)
        cy.get(Locators.Register.Email).type(usedEmail)
        cy.get(Locators.Register.Password).type(correctPassword)
        cy.get(Locators.Register.ConfirmPass).type(correctPassword)
        cy.get(Locators.Register.Checkbox).click()
        cy.get(Locators.Register.Submit).click()
        cy.get(Locators.Register.Alert).should("be.visible").and("have.text","The email has already been taken.")


      })


       it("Create user with incorrect password",()=>{
           //cy.get(Locators.Header.Register).eq(2).click()
           cy.get(Locators.Register.FirstName).type(FirstName1)
           cy.get(Locators.Register.LastName).type(LastName1)
           cy.get(Locators.Register.Email).type(correctEmail)
           cy.get(Locators.Register.Password).type(incorrectPassword1)
           cy.get(Locators.Register.ConfirmPass).type(incorrectPassword1)
           cy.get(Locators.Register.Checkbox).click()
           cy.get(Locators.Register.Submit).click()
           cy.get(Locators.Register.Alert).should("be.visible").and("have.text","The password must be at least 8 characters.")
       })


       it("Create user with password without numbers",()=>{
           cy.get(Locators.Register.FirstName).type(FirstName1)
           cy.get(Locators.Register.LastName).type(LastName1)
           cy.get(Locators.Register.Email).type(correctEmail)
           cy.get(Locators.Register.Password).type(incorrectPassword2)
           cy.get(Locators.Register.ConfirmPass).type(incorrectPassword2)
           cy.get(Locators.Register.Checkbox).click()
           cy.get(Locators.Register.Submit).click()
           cy.get(Locators.Register.Alert).should("be.visible")
           cy.get(Locators.Register.Alert).should("contain","The password format is invalid.")

       })

       
       it("Create user with inccorect confirmed password",()=>{
           cy.get(Locators.Register.FirstName).type(FirstName1)
           cy.get(Locators.Register.LastName).type(LastName1)
           cy.get(Locators.Register.Email).type(correctEmail)
           cy.get(Locators.Register.Password).type(correctPassword)
           cy.get(Locators.Register.ConfirmPass).type(incorrectPassword2)
           cy.get(Locators.Register.Checkbox).click()
           cy.get(Locators.Register.Submit).click()
           cy.get(Locators.Register.Alert).should("be.visible").and("contain","The password confirmation does not match.")
           

       })

       it.only("Create user without checkbox",()=>{
           cy.get(Locators.Register.FirstName).type(FirstName1)
           cy.get(Locators.Register.LastName).type(LastName1)
           cy.get(Locators.Register.Email).type(correctEmail)
           cy.get(Locators.Register.Password).type(correctPassword)
           cy.get(Locators.Register.ConfirmPass).type(correctPassword)
           cy.get(Locators.Register.Submit).click()
           cy.get(Locators.Register.Alert).should("be.visible").and("have.text","The terms and conditions must be accepted.")
       })
      




    afterEach("Clearovanje cache",()=>{
        cy.clearLocalStorage()
    })

})