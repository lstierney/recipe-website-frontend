import {screen} from "@testing-library/react";
import Preview from "./Preview";
import {renderWithProviders} from "../../../utils/test-utils";
import {RecipePreviewType} from "../../../types/recipePreviewType";

const recipePreview: RecipePreviewType = {
    id: 1,
    name: 'Recipe Name',
    cooked: 69,
    description: 'Recipe Description',
    imageFileName: 'recipe.jpg'
}

const renderRecipePreview = () => {
    return renderWithProviders(<Preview recipe={recipePreview}/>);
}

describe('Recipe Preview component', () => {
    test('renders recipe image', () => {
        // Arrange
        renderRecipePreview();

        // Act
        // -- nothing

        // Assert
        const images = screen.getAllByRole('img', {name: recipePreview.name});
        expect(images).toHaveLength(1);
        expect(images[0]).toHaveAttribute('alt', recipePreview.name);
        expect(images[0]).toHaveAttribute('src', 'http://localhost:8080/images/recipe.jpg');
    });
    test('renders cooked image', () => {
        // Arrange
        renderRecipePreview();

        // Act
        // -- nothing

        // Assert
        const images = screen.getAllByRole('img', {name: 'Number of times cooked'});
        expect(images).toHaveLength(1);
        expect(images[0]).toHaveAttribute('alt', 'Number of times cooked');
        expect(images[0]).toHaveAttribute('src', 'cooked.svg');
    });
    test('renders name', () => {
        // Arrange
        renderRecipePreview();

        // Act
        // -- nothing

        // Assert
        expect(screen.getByText('Recipe Name', {exact: true})).toBeInTheDocument();
    });
    test('renders cooked number', () => {
        // Arrange
        renderRecipePreview();

        // Act
        // -- nothing

        // Assert
        expect(screen.getByText('69', {exact: true})).toBeInTheDocument();
    });
});