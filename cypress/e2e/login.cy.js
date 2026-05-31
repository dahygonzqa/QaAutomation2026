describe ('Login Sauce Demo', ()=>{

    beforeEach(()=>{
        cy.visit('https://www.saucedemo.com/')
    })

    it('Login exitoso',()=>{
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()

        cy.url().should('include','/inventory.html')
        cy.get('.app_logo').should('have.text', 'Swag Labs')
    })

    it('Login con contrasenia incorrecta',()=>{
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('12345')
        cy.get('[data-test="login-button"]').click()

        cy.get('[data-test="error"]')
        .should('be.visible')
        .and('contain','Epic sadface: Username and password do not match any user in this service')
    })

    it('Login con campos vacíos',()=>{
        cy.get('[data-test="login-button"]').click()
        cy.get('[data-test="error"]').should('be.visible').and('contain','Epic sadface: Username is required')
    })

    it('Login con usuario bloqueado (locked_out_user)', () => {
        cy.get('[data-test="username"]').type('locked_out_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()

        cy.get('[data-test="error"]')
        .should('be.visible')
        .and('contain','Epic sadface: Sorry, this user has been locked out.')
    })

    it('Logout desde el menú hamburguesa', () => {
        cy.get('[data-test="username"]').type('standard_user')
        cy.get('[data-test="password"]').type('secret_sauce')
        cy.get('[data-test="login-button"]').click()

        cy.get('#react-burger-menu-btn').click()
        cy.get('#logout_sidebar_link').click()

        cy.url().should('eq', 'https://www.saucedemo.com/')
    })

})