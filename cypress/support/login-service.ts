import {User} from "../types/user";

export const userService = {
    login(user: User) {
        // If there are no workers, we should log in shortly.
        // However, there's a bug where a 404 page occurs before the logged-in inventory page.
        // cy.setCookie('session-username', user.login);

        // So we will have to log in through the UI
        cy.visit('/');
        cy.get('[data-test="username"]').clear().type(user.login);
        cy.get('[data-test="password"]').clear().type(user.password);
        cy.get('[data-test="login-button"]').click();
    }
}
