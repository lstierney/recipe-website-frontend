import {screen} from "@testing-library/react";
import Preview from "./Preview";
import {renderWithProviders} from "../../../utils/test-utils";
import {RecipePreviewType} from "../../../types/recipePreviewType";

const recipePreview: RecipePreviewType = {
    id: 1,
    name: 'Recipe Name',
    cooked: 69,
    description: 'Recipe Description',
    lastCooked: '2024-01-21T17:41:04',
    imageFileNames: ['image1.jpg'],
    imageFolderPath: '/opt/recipe-website/images/1 - Recipe Name/'
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
        expect(images[0]).toHaveAttribute('src', 'http://localhost:8080/opt/recipe-website/images/1 - Recipe Name/image1.jpg');
    });
    test('renders cooked image', () => {
        // Arrange
        renderRecipePreview();

        // Act
        // -- nothing

        // Assert
        const images = screen.getAllByRole('img', {name: 'Last Cooked Date'});
        expect(images).toHaveLength(1);
        expect(images[0]).toHaveAttribute('alt', 'Last Cooked Date');
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
    test('renders last cooked date by default', () => {
        // Arrange
        renderRecipePreview();

        // Act
        // -- nothing

        // Assert
        expect(screen.getByText('21/01/24', {exact: true})).toBeInTheDocument();
    });
});