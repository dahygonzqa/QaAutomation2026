describe('Pruebas de Checkout - Sauce Demo', () => {

    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/')
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.url().should('include', '/inventory.html')
    })

    it('Completar checkout con datos válidos', () => {
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()

        cy.get('.shopping_cart_link').click()
        cy.get('[data-test="checkout"]').click()

        cy.get('[data-test="firstName"]').type('Apu')
        cy.get('[data-test="lastName"]').type('Nahasapeemapetilon')
        cy.get('[data-test="postalCode"]').type('5000')

        cy.get('[data-test="continue"]').click()
        cy.get('[data-test="finish"]').click()

        cy.get('.complete-header').should('have.text', 'Thank you for your order!')
    })

    it('Checkout sin completar campos obligatorios', () => {
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('.shopping_cart_link').click()
        cy.get('[data-test="checkout"]').click()

        cy.get('[data-test="continue"]').click()

        cy.get('[data-test="error"]').should('be.visible').and('contain', 'First Name is required')
        cy.url().should('include', '/checkout-step-one.html')
    })

})
