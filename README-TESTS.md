# Guide d'exécution des tests Cypress

## Méthode recommandée : Interface Cypress

1. Assurez-vous que le serveur de développement est démarré :
   ```bash
   npm start
   ```

2. Dans un autre terminal, ouvrez Cypress :
   ```bash
   npm run cy
   ```

3. Dans l'interface Cypress qui s'ouvre :
   - Sélectionnez "E2E Testing"
   - Choisissez Chrome comme navigateur
   - Cliquez sur le fichier `dle.cy.ts`
   - Les tests s'exécuteront et vous verrez les résultats en temps réel

## Tests implémentés

### ✅ Test 1 : Affichage de la grille de résultats
- **Fichier** : `src/test/cypress/dle.cy.ts`
- **Description** : Vérifie que la grille de résultats s'affiche après avoir deviné un Pokémon
- **Attributs data-test ajoutés** :
  - `results-grid-headers` : En-têtes de la grille
  - `results-grid` : Grille de résultats
  - `result-row` : Ligne de résultat
  - `rank-cell` : Cellule de rang
  - `pokemon-input` : Champ de saisie
  - `pokemon-image` : Image du Pokémon

### 🔜 Tests à venir
- Test 2 : Impossibilité de deviner deux fois le même Pokémon
- Test 3 : Vérification des cellules colorées (vert/orange/rouge)
- Test 4 : Test de victoire (toutes cellules vertes)
- Test 5 : Vérification des flèches directionnelles

## Validation visuelle

Le Test 1 a été validé visuellement avec succès :
- ✅ La grille n'apparaît pas avant la première tentative
- ✅ La grille s'affiche après avoir sélectionné un Pokémon
- ✅ Tous les attributs `data-test` sont en place
- ✅ Les cellules colorées s'affichent correctement
