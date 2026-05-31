describe('Inventario - Sauce Demo', () => {

    beforeEach(()=>{
        cy.visit('https://www.saucedemo.com/')
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()
        cy.url().should('include','/inventory.html')
    })

    it('Verificar cantidad de productos en inventario', () => {
        cy.get('[data-test="inventory-item-name"]').should('have.length',6)
    })

    it('Ordenamiento de productos – Ordenar productos por precio (menor a mayor)',()=>{
        cy.get('[data-test="product-sort-container"]').select('lohi')
        cy.get('[data-test="product-sort-container"]').should('have.value','lohi')
        
        cy.get('.inventory_item_name').first().should('have.text','Sauce Labs Onesie')
        cy.get('.inventory_item_price').first().should('have.text','$7.99')
        cy.get('.inventory_item_price').last().should('have.text','$49.99')
    })

})
