describe('Pruebas de Carrito - Sauce Demo', () => {

    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/')
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.url().should('include', '/inventory.html')
    })

    it('Agregar un producto al carrito', () => {
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()

        cy.get('[data-test="remove-sauce-labs-backpack"]').should('be.visible').and('have.text', 'Remove')
        cy.get('.shopping_cart_badge').should('be.visible').and('have.text', '1')
    })

    it('Agregar múltiples productos y verificar contador', () => {
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
        cy.get('[data-test="add-to-cart-sauce-labs-onesie"]').click()

        cy.get('.shopping_cart_badge').should('be.visible').and('have.text', '3')

        cy.get('[data-test="remove-sauce-labs-backpack"]').should('have.text', 'Remove')
        cy.get('[data-test="remove-sauce-labs-bike-light"]').should('have.text', 'Remove')
        cy.get('[data-test="remove-sauce-labs-onesie"]').should('have.text', 'Remove')
    })

    it('Eliminar un producto desde la página del carrito', () => {
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()

        cy.get('.shopping_cart_link').click()
        cy.url().should('include', '/cart.html')

        cy.get('.cart_item').should('have.length', 2)

        cy.get('[data-test="remove-sauce-labs-backpack"]').click()

        cy.get('.cart_item').should('have.length', 1)
        cy.contains('Sauce Labs Backpack').should('not.exist')
        cy.get('.shopping_cart_badge').should('be.visible').and('have.text', '1')
    })

})

