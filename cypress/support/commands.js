// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import './commands'

import { faker } from '@faker-js/faker'

Cypress.Commands.add('registerUser', (user) => {
    // Inicia o processo de Signup
    cy.get('[data-qa="signup-name"]').type(user.name)
    cy.get('[data-qa="signup-email"]').type(user.email)
    cy.get('[data-qa="signup-button"]').click()

    // Preenche informações da conta
    cy.get('#id_gender1').check()
    cy.get('#password').type(user.password)
    cy.get('#days').select('10')
    cy.get('#months').select('May')
    cy.get('#years').select('1995')

    // Informações de endereço
    cy.get('#first_name').type('Jessica')
    cy.get('#last_name').type('Machado')
    cy.get('#company').type('QA Company')
    cy.get('#address1').type(faker.location.streetAddress())
    cy.get('#country').select('India')
    cy.get('#state').type('Parana')
    cy.get('#city').type('São José dos Pinhais')
    cy.get('#zipcode').type('83025325')
    cy.get('#mobile_number').type('44999999999')

    // Finaliza o cadastro
    cy.contains('Create Account').click()

    // Verifica se deu certo e continua
    cy.contains('Account Created!').should('be.visible')
    cy.contains('Continue').click({ force: true })
})
    // comando para reaproveitar dados do cartão em possiveis cenarios posteriores
Cypress.Commands.add('fillPaymentDetails', (name, cardInfo) => {
    cy.get('[data-qa="name-on-card"]').type(name)
    cy.get('[data-qa="card-number"]').type(cardInfo.number)
    cy.get('[data-qa="cvc"]').type(cardInfo.cvc)
    cy.get('[data-qa="expiry-month"]').type(cardInfo.month)
    cy.get('[data-qa="expiry-year"]').type(cardInfo.year)
    cy.get('[data-qa="pay-button"]').click()
})