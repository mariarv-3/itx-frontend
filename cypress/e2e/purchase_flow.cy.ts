describe('Purchase Flow', () => {
  it('should search for a product, view details, and add to cart', () => {
    // 1. Visit the main page
    cy.visit('/');

    // 2. Use the search bar to find a specific brand
    cy.get('input[type="search"]').type('Acer');

    // 3. Click on the first product in the grid
    cy.get('a[href^="/product/"]').first().click();

    // 4. Verify we are on the details page by checking for the Add to cart button
    // The button text might be different based on dictionary, assuming 'Add to Cart' or 'Añadir al carrito'.
    // We will look for a generic button since we know the actions are rendered there.
    cy.get('button').contains(/Add to cart|Añadir/i).should('be.visible');

    // 5. We assume default options for Storage and Color are pre-selected
    // as per the requirements.

    // 6. Click the Add to Cart button
    cy.get('button').contains(/Add to cart|Añadir/i).click();

    // 7. Verify the cart counter in the header updates to 1
    // The header is at the top of the page.
    cy.get('header').should('contain', '1');
  });
});
