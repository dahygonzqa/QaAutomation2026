describe('Inventario - Sauce Demo', () => {

    beforeEach(()=>{
        cy.visit('https://www.saucedemo.com/')
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.url().should('include','/inventory.html')
    })

    it('Verificar cantidad de productos', () => {
        cy.get('[data-test="inventory-item-name"]').should('have.length',6)
    })

    it('Ordenar productos por precio (menor a mayor)',()=>{
        cy.get('[data-test="product-sort-container"]').select('lohi')
        cy.get('[data-test="product-sort-container"]').should('have.value','lohi')
        
        cy.get('.inventory_item_name').first().should('have.text','Sauce Labs Onesie')
        cy.get('.inventory_item_price').first().should('have.text','$7.99')
        cy.get('.inventory_item_price').last().should('have.text','$49.99')
    })

    it('Ordenar productos por precio (mayor a menor)',()=>{
        cy.get('[data-test="product-sort-container"]').select('hilo')
        cy.get('[data-test="product-sort-container"]').should('have.value','hilo')
        
        cy.get('.inventory_item_name').first().should('have.text','Sauce Labs Fleece Jacket')
        cy.get('.inventory_item_price').first().should('have.text','$49.99')
        cy.get('.inventory_item_price').last().should('have.text','$7.99')
    })

    it('Ordenar productos por nombre (Z a A)',()=>{
        cy.get('[data-test="product-sort-container"]').select('za')
        cy.get('[data-test="product-sort-container"]').should('have.value','za')
        
        cy.get('.inventory_item_name').first().should('have.text','Test.allTheThings() T-Shirt (Red)')
        cy.get('.inventory_item_name').last().should('have.text','Sauce Labs Backpack')
    })

    it('Agregar un producto al carrito', () => {
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('.shopping_cart_badge').should('have.text', '1')
        cy.get('[data-test="remove-sauce-labs-backpack"]').should('be.visible')
    })

    it('Remover un producto del carrito', () => {
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('.shopping_cart_badge').should('have.text', '1')
        
        cy.get('[data-test="remove-sauce-labs-backpack"]').click()
        cy.get('.shopping_cart_badge').should('not.exist')
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').should('be.visible')
    })

})