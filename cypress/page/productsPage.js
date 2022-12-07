class Products {
    /**
     * define selectors using getter methods
     */

    get onsesieItem() {
        return ('#add-to-cart-sauce-labs-onesie')
    }

    get bikeItem() {
        return ('#add-to-cart-sauce-labs-bike-light')
    }

    get boltItem() {
        return ('#add-to-cart-sauce-labs-bolt-t-shirt')
    }

    get cartBadge() {
        return ('.shopping_cart_badge')
    }

    get removeBtn() {
        return ('#remove-sauce-labs-onesie')
    }

    get cartLink() {
        return ('.shopping_cart_link')
    }

    get sortBtn() {
        return ('.product_sort_container')
    }

    get activeOption() {
        return ('.active_option')
    }

    get inventoryItems() {
        return ('div.inventory_item')
    }

    get itemName() {
        return ('.inventory_item_name')
    }

    get itemPrice() {
        return ('.inventory_item_price')
    }



    addToCart() {
        cy.get(this.onsesieItem).click()
    }

    addMultiCart() {
        cy.get(this.bikeItem).click()
        cy.get(this.boltItem).click()
        cy.get(this.onsesieItem).click()
    }

    removeFromCart() {
        cy.get(this.removeBtn).click()
    }

    navToCart() {
        cy.get(this.cartLink).click()
    }

    sortBy(option) {
        cy.get(this.sortBtn).select(option)
    }

}

export default new Products()