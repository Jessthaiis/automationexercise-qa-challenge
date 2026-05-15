describe('GET All Products List', () => {

  it('should return all products with valid schema', () => {

    cy.api({
      method: 'GET',
      url: 'https://automationexercise.com/api/productsList'
    }).then((response) => {

      // Valida se a API respondeu com sucesso
      expect(response.status).to.eq(200)

      // Converte para JSON se necessário (algumas APIs do Automation Exercise retornam string)
      const body = typeof response.body === 'string' ? JSON.parse(response.body) : response.body

      // Verifica se existe a lista de produtos
      expect(body).to.have.property('products')
      expect(body.products).to.be.an('array')
      expect(body.products.length).to.be.greaterThan(0)

      // Percorre todos os produtos da lista
      body.products.forEach((product) => {

        // Valida se o produto possui todos os campos esperados
        expect(product).to.have.all.keys(
          'id',
          'name',
          'price',
          'brand',
          'category'
        )

        // Valida os tipos de cada campo
        expect(product.id).to.be.a('number')
        expect(product.name).to.be.a('string')
        expect(product.price).to.be.a('string')
        expect(product.brand).to.be.a('string')

        // Valida se category é um objeto
        expect(product.category).to.be.an('object')

        // Valida os campos dentro de category
        expect(product.category).to.have.all.keys(
          'usertype',
          'category'
        )

        // Valida a estrutura interna de usertype
        expect(product.category.usertype).to.have.property('usertype')
        
        // Valida se o nome da categoria é uma string
        expect(product.category.category).to.be.a('string')
      })
    })
  })
})