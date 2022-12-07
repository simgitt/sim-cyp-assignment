/// <reference types="cypress" />

import LoginPage from '../../page/login'
import LoginData from '../../data/userData'
import ProductsPage from '../../page/productsPage'
import InventoryData from '../../data/inventoryData'


describe('Sorting', () => {
    beforeEach(() => {
        cy.visit('/')
        
        LoginPage.login(LoginData[0].username, LoginData[0].password)
    })

    it('should sort items from A-Z', () => {

        ProductsPage.sortBy('az')
        cy.get(ProductsPage.activeOption).should('have.text', 'Name (A to Z)')
        cy.get(ProductsPage.inventoryItems).each((item, index) => {
            let sorted = InventoryData.sort((a, b) => a.name > b.name ? 1 : -1)
            expect(item.text().slice(0, sorted[index].count)).equal(sorted[index].name)
        })
    })

    it('should sort items from Z-A', () => {
        ProductsPage.sortBy('za')
        cy.get(ProductsPage.activeOption).should('have.text', 'Name (Z to A)')
        cy.get(ProductsPage.inventoryItems).each((item, index) => {
            let sorted = InventoryData.sort((a, b) => b.name > a.name ? 1 : -1)
            expect(item.text().slice(0, sorted[index].count)).equal(sorted[index].name)
        })
    })


    it('should sort items from low to high', () => {

        ProductsPage.sortBy('lohi')
        cy.get(ProductsPage.activeOption).should('have.text', 'Price (low to high)')
        cy.get(ProductsPage.inventoryItems).each((item, index) => {
            let sorted = InventoryData.sort((a, b) => a.price > b.price ? 1 : -1)
            cy.get(item).find(ProductsPage.itemPrice).should('have.text', '$' + sorted[index].price)

        })
    })


    it('should sort items from high to low', () => {

        ProductsPage.sortBy('hilo')

        cy.get(ProductsPage.activeOption).should('have.text', 'Price (high to low)')
        cy.get(ProductsPage.inventoryItems).each((item, index) => {
            let sorted = InventoryData.sort((a, b) => b.price > a.price ? 1 : -1)
            cy.get(item).find(ProductsPage.itemPrice).should('have.text', '$' + sorted[index].price)

        })
    })

})