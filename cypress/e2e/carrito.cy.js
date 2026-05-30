describe('Pruebas de Carrito - Sauce Demo', () => {

    beforeEach(() => {
        // 1. Loguearse como standard_user
        cy.visit('https://www.saucedemo.com/')
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.url().should('include', '/inventory.html')
    })

    it('Agregar un producto al carrito', () => {
        // 2. Click en "Add to cart" del primer producto (Sauce Labs Backpack)
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()

        // 3. Verificar el ícono del carrito y el cambio de botón
        cy.get('[data-test="remove-sauce-labs-backpack"]').should('be.visible').and('have.text', 'Remove')
        cy.get('.shopping_cart_badge').should('be.visible').and('have.text', '1')
    })

    it('Agregar múltiples productos y verificar contador', () => {
        // 2. Agregar 3 productos distintos (Backpack, Bike Light, Onesie)
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
        cy.get('[data-test="add-to-cart-sauce-labs-onesie"]').click()

        // 3. Verificar el badge del carrito (muestra '3')
        cy.get('.shopping_cart_badge').should('be.visible').and('have.text', '3')

        // Verificar que los botones cambiaron a 'Remove'
        cy.get('[data-test="remove-sauce-labs-backpack"]').should('have.text', 'Remove')
        cy.get('[data-test="remove-sauce-labs-bike-light"]').should('have.text', 'Remove')
        cy.get('[data-test="remove-sauce-labs-onesie"]').should('have.text', 'Remove')
    })

    it('Eliminar un producto desde la página del carrito', () => {
        // 2. Agregar 2 productos al carrito
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()

        // 3. Ir al carrito (click en ícono)
        cy.get('.shopping_cart_link').click()
        cy.url().should('include', '/cart.html')

        // Verificar que haya 2 productos en la lista inicialmente
        cy.get('.cart_item').should('have.length', 2)

        // 4. Click en 'Remove' del primer producto (Sauce Labs Backpack)
        cy.get('[data-test="remove-sauce-labs-backpack"]').click()

        // Verificar que el producto se elimine de la lista y el badge pase a '1'
        cy.get('.cart_item').should('have.length', 1)
        cy.contains('Sauce Labs Backpack').should('not.exist')
        cy.get('.shopping_cart_badge').should('be.visible').and('have.text', '1')
    })

})
