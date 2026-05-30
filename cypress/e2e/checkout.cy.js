describe('Pruebas de Checkout - Sauce Demo', () => {

    beforeEach(() => {
        // 1. Loguearse como standard_user
        cy.visit('https://www.saucedemo.com/')
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.url().should('include', '/inventory.html')
    })

    it('Completar checkout con datos válidos', () => {
        // 2. Agregar 1 producto
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()

        // 3. Ir al carrito -> Click en "Checkout"
        cy.get('.shopping_cart_link').click()
        cy.get('[data-test="checkout"]').click()

        // 4. Completar: First Name, Last Name, Zip
        cy.get('[data-test="firstName"]').type('Apu')
        cy.get('[data-test="lastName"]').type('Nahasapeemapetilon')
        cy.get('[data-test="postalCode"]').type('5000')

        // 5. Click "Continue" -> Click "Finish"
        cy.get('[data-test="continue"]').click()
        cy.get('[data-test="finish"]').click()

        // Verificar pantalla de confirmación
        cy.get('.complete-header').should('have.text', 'Thank you for your order!')
    })

    it('Checkout sin completar campos obligatorios', () => {
        // 2. Agregar 1 producto -> Ir al carrito -> Checkout
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('.shopping_cart_link').click()
        cy.get('[data-test="checkout"]').click()

        // 3. Dejar todos los campos vacíos
        // 4. Click en "Continue"
        cy.get('[data-test="continue"]').click()

        // Verificar mensaje de error y que no avanza
        cy.get('[data-test="error"]').should('be.visible').and('contain', 'First Name is required')
        cy.url().should('include', '/checkout-step-one.html')
    })

})
