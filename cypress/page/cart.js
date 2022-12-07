class Cart {

    get singleItem() {
        return ('.inventory_item_name')
    }

    get allItems() {
        return ('.cart_item')
    }

    get cartLink() {
        return ('.shopping_cart_link')
    }

    get cartQuantity() {
        return ('.cart_quantity')
    }

    get itemPrice() {
        return ('.inventory_item_price')
    }

    get checkoutBtn() {
        return ('#checkout')
    }

    get firstNameField() {
        return ('#first-name')
    }

    get lastNameField() {
        return ('#last-name')
    }

    get zipField() {
        return ('#postal-code')
    }

    get continueBtn() {
        return ('#continue')
    }

    get finishBtn() {
        return ('#finish')
    }

    get itemTotal() {
        return ('.summary_subtotal_label')
    }

    get tax() {
        return ('.summary_tax_label')
    }

    get total() {
        return ('.summary_total_label')
    }

    get completeHeader() {
        return ('.complete-header')
    }

    get errorMsg() {
        return ('h3[data-test="error"]')
    }


    completeForm() {
        cy.get(this.firstNameField).type("Karl")
        cy.get(this.lastNameField).type("Williams")
        cy.get(this.zipField).type("876")
        cy.get(this.continueBtn).click()
    }

    noFirstName() {
        cy.get(this.lastNameField).type("Williams")
        cy.get(this.zipField).type("66883")
        cy.get(this.continueBtn).click()
    }

    noLastName() {
        cy.get(this.firstNameField).type("Karl")
        cy.get(this.zipField).type("193982")
        cy.get(this.continueBtn).click()
    }

    noZipCode() {
        cy.get(this.firstNameField).type("Karl")
        cy.get(this.lastNameField).type("Williams")
        cy.get(this.continueBtn).click()
    }




}

export default new Cart()