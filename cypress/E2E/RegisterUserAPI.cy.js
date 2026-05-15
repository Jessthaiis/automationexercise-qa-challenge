import { faker } from '@faker-js/faker'

describe('POST Create/Register User', () => {

  it('should create a new user successfully via API', () => {

    const user = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: 'Test@123',
      title: 'Mrs',
      birth_date: '10',
      birth_month: '5',
      birth_year: '1995',
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      company: 'QA Company',
      address1: faker.location.streetAddress(),
      address2: 'Apartment 101',
      country: 'India',
      zipcode: '87000000',
      state: 'Parana',
      city: 'Maringa',
      mobile_number: '44999999999'
    }

    cy.api({
      method: 'POST',
      url: 'https://automationexercise.com/api/createAccount',
      form: true, // Necessário para esta API específica
      body: user
    }).then((response) => {

      // Valida o status da requisição HTTP
      expect(response.status).to.eq(200)

      // Trata o corpo da resposta
      const body = typeof response.body === 'string' 
        ? JSON.parse(response.body) 
        : response.body

      // Validações da regra de negócio da API
      expect(body.responseCode).to.eq(201)
      expect(body.message).to.eq('User created!')
    })
  })
})