/// <reference types="cypress" />

import LoginPage from '../../page/login'
import LoginData from '../../data/userData'
import ProductsPage from '../../page/productsPage'
import CartPage from '../../page/cart'
import ProductsData from '../../data/productsData'


describe('CheckoutFlows', () => {
    beforeEach(() => {
        cy.visit('/')

        LoginPage.login(LoginData[0].username, LoginData[0].password)
    })

    

    it('should complete checkout with a single item', () => {

        ProductsPage.addToCart()
        cy.get(ProductsPage.cartBadge).should('be.visible').should('have.text', '1')
        cy.get(ProductsPage.removeBtn).should('be.visible')

      
        ProductsPage.navToCart()
        cy.url().should('eq', ProductsData[3].cartUrl)
        cy.get(CartPage.singleItem).should('have.text', ProductsData[0].product)
        cy.get(CartPage.cartQuantity).should('have.text', 1)
        cy.get(CartPage.itemPrice).should('have.text', '$' + ProductsData[0].price)


        cy.get(CartPage.checkoutBtn).click()
        cy.url().should('eq', ProductsData[3].checkoutUrl)
        CartPage.completeForm()
        cy.url().should('eq', ProductsData[3].checkoutNextUrl)
        cy.get(CartPage.itemTotal).should('include.text', '$' + ProductsData[0].price)
        cy.get(CartPage.tax).should('include.text', '$' + ProductsData[0].expectedTax)
        cy.get(CartPage.total).should('include.text', '$' + (ProductsData[0].price + ProductsData[0].expectedTax))
        cy.get(CartPage.finishBtn).click()

        cy.url().should('eq', ProductsData[3].confirmationUrl)
        cy.get(CartPage.completeHeader).should('have.text', "THANK YOU FOR YOUR ORDER")
    })

    it('should complete checkout with multiple items', () => {

        ProductsPage.addMultiCart()
        cy.get(ProductsPage.cartBadge).should('be.visible').should('have.text', '3')

        ProductsPage.navToCart()
        cy.url().should('eq', ProductsData[3].cartUrl)
        cy.get(CartPage.allItems).find('#item_0_title_link').should('have.text', ProductsData[1].product).siblings('.item_pricebar').children(CartPage.itemPrice).should('have.text', '$' + ProductsData[1].price)
        cy.get(CartPage.allItems).find('#item_1_title_link').should('have.text', ProductsData[2].product).siblings('.item_pricebar').children(CartPage.itemPrice).should('have.text', '$' + ProductsData[2].price)
        cy.get(CartPage.allItems).find('#item_2_title_link').should('have.text', ProductsData[0].product).siblings('.item_pricebar').children(CartPage.itemPrice).should('have.text', '$' + ProductsData[0].price)

        cy.get(CartPage.checkoutBtn).click()
        cy.url().should('eq', ProductsData[3].checkoutUrl)
        CartPage.completeForm()
        cy.url().should('eq', ProductsData[3].checkoutNextUrl)

        const itemTotalPrice = (ProductsData[1].price + ProductsData[2].price + ProductsData[0].price)
        const tax = (ProductsData[1].expectedTax + ProductsData[2].expectedTax + ProductsData[0].expectedTax)
        const grandTotal = (itemTotalPrice + tax)

        cy.get(CartPage.itemTotal).should('include.text', '$' + itemTotalPrice)
        cy.get(CartPage.tax).should('include.text', '$' + tax)
        cy.get(CartPage.total).should('include.text', '$' + grandTotal)
        cy.get(CartPage.finishBtn).click()

        cy.url().should('eq', ProductsData[3].confirmationUrl)
        cy.get(CartPage.completeHeader).should('have.text', "THANK YOU FOR YOUR ORDER")


    })
})