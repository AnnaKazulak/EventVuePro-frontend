describe('NavigationBar - User not logged in', () => {
    beforeEach(() => {
        // Visit the page before each test
        cy.visit('/');
    });

    it('should display all elements when user is not logged in', () => {
        // Check the visibility of SignUp link
        cy.get('[data-testid=signup-link-navigationsBar]').should('be.visible');

        // Check the visibility of Login link
        cy.get('[data-testid=login-link-navigationsBar]').should('be.visible');
    });

    it('should not display user-related elements when user is not logged in', () => {
        // Check that user-related elements are not visible
        cy.get('[data-testid=user-page-link-navigationsBar]').should('not.exist');
        cy.get('[data-testid=logout-button-navigationsBar]').should('not.exist');
    });

    it('should display the logo', () => {
        // Check the visibility of the logo link
        cy.get('[data-testid=logo-link-navigationsBar]').should('be.visible');
    });

    it('should display the hamburger icon for mobile navigation and show SignUp and Login links when clicked', () => {
        // Set viewport to mobile size
        cy.viewport('iphone-6');

        // Check the initial visibility of SignUp and Login links
        cy.get('[data-testid=signup-link-navigationsBar]').should('not.be.visible');
        cy.get('[data-testid=login-link-navigationsBar]').should('not.be.visible');

        // Click on the mobile navigation toggler
        cy.get('[data-testid=mobile-nav-toggler-navigationsBar]').click();

        // Check if SignUp and Login links are visible after clicking
        cy.get('[data-testid=signup-link-navigationsBar]').should('be.visible');
        cy.get('[data-testid=login-link-navigationsBar]').should('be.visible');
    });

    it('user hits on log in and gets redirected to a login page', () => {
        // Set viewport to mobile size
        cy.viewport('iphone-6');

        // Click on the mobile navigation toggler
        cy.get('[data-testid=mobile-nav-toggler-navigationsBar]').click();

        // Check if the login button is visible
        cy.get('[data-testid=login-link-navigationsBar]').should('be.visible');

        // Click on the login button
        cy.get('[data-testid=login-link-navigationsBar]').click();

        // After clicking the login button, user should be redirected to the login page
        cy.url().should('include', '/auth/login');
    });

    it('user hits on sign up and gets redirected to a sign up page', () => {
        // Set viewport to mobile size
        cy.viewport('iphone-6');
    
        // Click on the mobile navigation toggler
        cy.get('[data-testid=mobile-nav-toggler-navigationsBar]').click();
    
        // Check if the sign up button is visible
        cy.get('[data-testid=signup-link-navigationsBar]').should('be.visible');
    
        // Click on the sign up button
        cy.get('[data-testid=signup-link-navigationsBar]').click();
    
        // After clicking the sign up button, user should be redirected to the sign up page
        cy.url().should('include', '/auth/signup');
    });
    

});