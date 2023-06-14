import {renderWithProviders} from "../../utils/test-utils";
import {screen} from "@testing-library/react";
import RecipesList from "./RecipesList";

const recipes = [
    {
        id: 1,
        name: 'Recipe One Name'
    },
    {
        id: 3,
        name: 'Recipe Three Name'
    }
];

describe('RecipesList component', () => {
    test('displays "No recipes found" when no Recipes are supplied', () => {
        // Arrange
        renderWithProviders(<RecipesList/>);

        // Act
        // ... nothing

        // Assert
        const message = screen.getByText('No recipes found!', {exact: true});
        expect(message).toBeInTheDocument();
    });

    test('does not displays links to Recipes when no Recipes are supplied', () => {
        // Arrange
        renderWithProviders(<RecipesList/>);

        // Act
        // ... nothing

        // Assert
        expect(screen.queryAllByRole('link')).toHaveLength(0);
    });

    test('displays links to Recipes when Recipes are supplied', () => {
        // Arrange
        renderWithProviders(<RecipesList recipes={recipes}/>);

        // Act
        // ... nothing

        // Assert
        expect(screen.getAllByRole('link')).toHaveLength(2);
        expect(screen.getByRole('link', {name: 'Recipe One Name'})).toHaveAttribute('href', '/recipes/1')
        expect(screen.getByRole('link', {name: 'Recipe Three Name'})).toHaveAttribute('href', '/recipes/3')
    });

    test('does not display "No recipes found" when Recipes are supplied', () => {
        // Arrange
        renderWithProviders(<RecipesList recipes={recipes}/>);

        // Act
        // ... nothing

        // Assert
        const message = screen.queryByText('No recipes found!', {exact: false});
        expect(message).not.toBeInTheDocument();
    });
});