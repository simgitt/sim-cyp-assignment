/// <reference types="cypress" />

import LoginPage from '../../page/login'
import LoginData from '../../data/userData'
import ProductsPage from '../../page/productsPage'


describe('Remove Items', () => {
    beforeEach(() => {
        cy.visit('/')

        LoginPage.login(LoginData[0].username, LoginData[0].password)
    })

    it('should remove item from product list page', () => {
        ProductsPage.addToCart()
        cy.get(ProductsPage.cartBadge).should('be.visible').should('have.text', '1')
        cy.get(ProductsPage.removeBtn).should('be.visible')
        ProductsPage.removeFromCart()
        cy.get(ProductsPage.removeBtn).should('not.exist')
        cy.get(ProductsPage.cartBadge).should('not.exist')
        cy.get(ProductsPage.onsesieItem).should('have.text', "Add to cart")
    })

    it('should remove item from cart', () => {
        ProductsPage.addToCart()
        ProductsPage.navToCart()
        ProductsPage.removeFromCart()
        cy.get(ProductsPage.removeBtn).should('not.exist')
        cy.contains('Sauce Labs Onesie').should('not.exist')
        cy.get(ProductsPage.cartBadge).should('not.exist')

    })
})