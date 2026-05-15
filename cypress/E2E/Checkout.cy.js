import { faker } from '@faker-js/faker'

describe('E2E Checkout Flow', () => {

  it('should complete purchase successfully', () => {

    const user = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: 'Test@123'
    }

    // Visita o site
    cy.visit('https://automationexercise.com')

    // Verifica se a home carregou
    cy.contains('AutomationExercise').should('be.visible')

    // ===== PRODUTO 1 =====
    cy.get('a[href="/product_details/1"]').click()
    cy.contains('Add to cart').click()
    cy.contains('Continue Shopping').click()

    // Volta para tela de produtos
    cy.contains('Products').click()

    // ===== PRODUTO 2 =====
    cy.get('a[href="/product_details/7"]').click()
    cy.contains('Add to cart').click()

    // Vai para o carrinho
    cy.contains('View Cart').click()

    // Verificações no carrinho
    cy.url().should('include', '/view_cart')
    cy.get('.cart_description').should('have.length', 2)

    // Inicia checkout
    cy.contains('Proceed To Checkout').click()
    cy.contains('u', 'Register / Login').click()

    // ===== CADASTRO =====
    cy.get('[data-qa="signup-name"]').type(user.name)
    cy.get('[data-qa="signup-email"]').type(user.email)
    cy.get('[data-qa="signup-button"]').click()

    // Preenche informações da conta
    cy.get('#id_gender1').check()
    cy.get('#password').type(user.password)
    cy.get('#days').select('10')
    cy.get('#months').select('May')
    cy.get('#years').select('1995')

    cy.get('#first_name').type('Jessica')
    cy.get('#last_name').type('Machado')
    cy.get('#company').type('QA Company')
    cy.get('#address1').type('Rua Teste')
    cy.get('#country').select('India')
    cy.get('#state').type('Parana')
    cy.get('#city').type('Maringa')
    cy.get('#zipcode').type('87000000')
    cy.get('#mobile_number').type('44999999999')

    cy.contains('Create Account').click()

    // Verifica criação da conta
    cy.contains('Account Created!').should('be.visible')
    
    // O clique no continue as vezes bloqueia por causa de anúncios
    cy.contains('Continue').click({ force: true })

    // ===== CHECKOUT =====
    cy.contains('Cart').click()
    cy.contains('Proceed To Checkout').click()

    // Verifica produtos no resumo do pedido
    cy.get('#product-1').should('exist')
    cy.get('#product-7').should('exist')

    // Comentário do pedido e finalização
    cy.get('textarea').type('Automation purchase test')
    cy.contains('Place Order').click()

    // ===== PAGAMENTO =====
    cy.get('[data-qa="name-on-card"]').type(user.name)
    cy.get('[data-qa="card-number"]').type('4111111111111111')
    cy.get('[data-qa="cvc"]').type('123')
    cy.get('[data-qa="expiry-month"]').type('12')
    cy.get('[data-qa="expiry-year"]').type('2030')
    cy.get('[data-qa="pay-button"]').click()

    // Verifica sucesso da compra
    cy.contains('Congratulations! Your order has been confirmed!').should('be.visible')
  })
})