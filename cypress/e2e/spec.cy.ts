import {userService} from "../support/login-service";
import {users} from "../fixtures/users";

describe('Basic flow', () => {
    const product = 'Sauce Labs Backpack';
    const standardUser = users.standardUser;

    it('Login with valid credentials', () => {
        // Login by standard_user
        cy.visit('/');
        cy.get('[data-test="username"]').clear().type(standardUser.login);
        cy.get('[data-test="password"]').clear().type(standardUser.password);
        cy.get('[data-test="login-button"]').click();

        cy.url().should('include', '/inventory');
        cy.get('[data-test="inventory-container"]').should('exist');
        cy.get('[data-test="inventory-item"]:first-child').should('exist');
    });

    it('Add products to the cart and complete a purchase', () => {
        userService.login(standardUser);

        // Store data about the product
        cy.contains('[data-test="inventory-item"]', product).within(() => {
            cy.get('[data-test="inventory-item-name"]').invoke('text').as('title', {type: 'static'});
            cy.get('[data-test="inventory-item-desc"]').invoke('text').as('description', {type: 'static'});
            cy.get('[data-test="inventory-item-price"]').invoke('text').as('price', {type: 'static'});

            // Navigate to the product's page
            cy.get('.inventory_item_img a').click();
        });

        // Add to the cart
        cy.get('[data-test="add-to-cart"]').click();

        // Check cart has badge with the count of products; navigate to the cart
        cy.get('[data-test="shopping-cart-badge"]').should('contain.text', '1');
        cy.get('[data-test="shopping-cart-badge"]').click();

        // Go to the checkout
        cy.get('[data-test="checkout"]').click();

        // Fill out the form
        cy.get('[data-test="firstName"]').clear().type(`<i>${standardUser.firstName}</i>`);
        cy.get('[data-test="lastName"]').clear().type(`<i>${standardUser.lastName}</i>`);
        cy.get('[data-test="postalCode"]').clear().type(`<i>AA${standardUser.zip}</i>`);
        cy.get('[data-test="continue"]').click();

        // Check that the product is correct
        cy.get('@title').then(title => {
            cy.get('[data-test="inventory-item-name"]').should('have.text', title);
        });
        cy.get('@description').then(description => {
            cy.get('[data-test="inventory-item-desc"]').should('have.text', description);
        });
        cy.get('@price').then(price => {
            cy.get('[data-test="inventory-item-price"]').should('have.text', price);
            cy.get('[data-test="subtotal-label"]').should('contain.text', price);
        });

        // Finish
        cy.get('[data-test="finish"]').click();

        // Check the Thank-you page
        cy.get('[data-test="complete-header"]').should('have.text', 'Thank you for your order!');
    });
});
