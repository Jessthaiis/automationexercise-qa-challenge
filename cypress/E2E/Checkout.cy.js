import { faker } from '@faker-js/faker'

describe('E2E Checkout Flow', () => {

  it('should complete purchase successfully', () => {
    const user = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: 'Test@123'
    }

    const cardData = {
      number: '4111111111111111',
      cvc: '123',
      month: '12',
      year: '2030'
    }

    cy.visit('/')
    cy.contains('AutomationExercise').should('be.visible')

    // ===== Adicionando produtos =====
    cy.get('a[href="/product_details/1"]').click()
    cy.contains('Add to cart').click()
    cy.contains('Continue Shopping').click()

    cy.contains('Products').click()
    cy.get('a[href="/product_details/7"]').click()
    cy.contains('Add to cart').click()
    cy.contains('View Cart').click()

    // ===== CHECKOUT E REGISTRO =====
    cy.contains('Proceed To Checkout').click()
    cy.contains('u', 'Register / Login').click()

    // Comando customizado para registro (UI)
    cy.registerUser(user)

    // ===== Finalização de pagamento =====
    cy.contains('Cart').click()
    cy.contains('Proceed To Checkout').click()

    cy.get('textarea').type('Automation purchase test with UI custom commands')
    cy.contains('Place Order').click()

    // ===== Pagamento =====
    // Comando customizado para pagamento
    cy.fillPaymentDetails(user.name, cardData)

    // Verifica sucesso da compra
    cy.contains('Congratulations! Your order has been confirmed!').should('be.visible')
  })
})