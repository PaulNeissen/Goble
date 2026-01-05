const dataSelector = (value: string) => `[data-test="${value}"]`;

describe('Dle', () => {
  it('should display title and informations', () => {
    cy.visit('/');
    cy.contains('GOBLE').should('exist');
    cy.contains('Guess today\'s open great league pokémon!').should('exist');
    cy.contains('Type any pokémon to begin.').should('exist');
  });

  it('should find today\'s Pokémon', () => {
    cy.visit('/');

    // Tape avec un delai sinon le panel du mat autocomplte ne s'affiche pas (je sais pas exactement pk)
    cy.get(dataSelector('pokemon-input')).type('Goli', { delay: 600 });

    cy.get('mat-option').should('be.visible').first().click();

    cy.get(dataSelector('pokemon-image'))
      .should('be.visible')
      .and(($img) => {
        expect(($img[0] as any).naturalWidth).to.be.greaterThan(0);
      });
  });

  it('should display results grid after a guess', () => {
    cy.visit('/');

    // Vérifier que la grille n'existe pas avant la tentative
    cy.get(dataSelector('results-grid')).should('not.exist');
    cy.get(dataSelector('results-grid-headers')).should('not.exist');

    // Effectuer une tentative
    cy.get(dataSelector('pokemon-input')).type('Goli', { delay: 600 });
    cy.get('mat-option').should('be.visible').first().click();

    // Vérifier que la grille s'affiche
    cy.get(dataSelector('results-grid-headers')).should('be.visible');
    cy.get(dataSelector('results-grid')).should('be.visible');
    
    // Vérifier qu'il y a au moins une ligne de résultat
    cy.get(dataSelector('result-row')).should('have.length', 1);
    
    // Vérifier que la cellule de rank est visible
    cy.get(dataSelector('rank-cell')).should('be.visible');
  });
});
