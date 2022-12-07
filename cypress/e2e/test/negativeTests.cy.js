/// <reference types="cypress" />

import LoginPage from '../../page/login'
import LoginData from '../../data/userData'
import ProductsPage from '../../page/productsPage'
import CartPage from '../../page/cart'


describe('Negative Tests Cases', () => {
    beforeEach(() => {
        cy.visit('/')
        LoginPage.login(LoginData[0].username, LoginData[0].password)
    })


    it('should not complete checkout form with no first name entered', () => {
        
        ProductsPage.addToCart()
        ProductsPage.navToCart()
        cy.get(CartPage.checkoutBtn).click()
        CartPage.noFirstName()
        cy.get(CartPage.errorMsg).should('be.visible').should('have.text', 'Error: First Name is required')
    })

    it('should not complete checkout form with no last name entered', () => {
        
        ProductsPage.addToCart()
        ProductsPage.navToCart()
        cy.get(CartPage.checkoutBtn).click()
        CartPage.noLastName()
        cy.get(CartPage.errorMsg).should('be.visible').should('have.text', 'Error: Last Name is required')
    })

    it('should not complete checkout form with no zip code entered', () => {

        ProductsPage.addToCart()
        ProductsPage.navToCart()
        cy.get(CartPage.checkoutBtn).click()
        CartPage.noZipCode()
        cy.get(CartPage.errorMsg).should('be.visible').should('have.text', 'Error: Postal Code is required')
    })

})