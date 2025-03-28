import React from 'react';
import {fireEvent, screen} from '@testing-library/react';
import PinButton from './PinButton';
import {RecipeType} from "../../../../types/recipeType";
import {renderWithProviders} from "../../../../utils/test-utils";

const recipe: RecipeType = {
    cooked: 2,
    cookingTime: 60,
    description: "A Test Recipe description",
    name: "Test Recipe",
    deleted: 0,
    imageFileNames: ['image1.jpg'],
    imageFolderPath: '/opt/recipe-website/images/2 - Test Recipe/'
};

describe('PinButton Component', () => {

    beforeEach(() => {
        // Replace the localStorage with a mock version
        Storage.prototype.setItem = jest.fn();
        Storage.prototype.getItem = jest.fn();
    });

    test('renders PinButton component', () => {
        // Arrange
        renderWithProviders(<PinButton recipe={recipe}/>);

        // Act
        // Do nothing

        // Assert
        // Did the icon render?
        expect(screen.getByRole('img', {name: 'Pin'})).toBeInTheDocument();

        // Did the link render?
        expect(screen.getByRole('button', {name: 'Pin'})).toBeInTheDocument();
    });

    test('clicking "Pin" saves Recipe name to localStorage', () => {
        // Arrange
        renderWithProviders(<PinButton recipe={recipe}/>);

        // Act
        const pinLink = screen.getByRole('button', {name: 'Pin'});
        fireEvent.click(pinLink);

        // Assert
        expect(localStorage.setItem).toHaveBeenCalledWith('pinnedRecipes', JSON.stringify([recipe.name]));
    });

    test('clicking "Pin" causes "Unpin" to render', () => {
        // Arrange
        renderWithProviders(<PinButton recipe={recipe}/>);

        // Act
        const pinLink = screen.getByRole('button', {name: 'Pin'})
        fireEvent.click(pinLink);

        // Assert
        expect(screen.getByRole('img', {name: 'Unpin'})).toBeInTheDocument();
        expect(screen.getByRole('button', {name: 'Unpin'})).toBeInTheDocument();

        expect(screen.queryByRole('img', {name: 'Pin'})).not.toBeInTheDocument();
        expect(screen.queryByRole('button', {name: 'Pin'})).not.toBeInTheDocument();
    });

    test('link and icon are in "unpin" mode when recipe is found in localStorage', () => {
        // Arrange
        const pinnedRecipes = JSON.stringify([recipe.name]);
        Storage.prototype.getItem = jest.fn(() => pinnedRecipes);
        renderWithProviders(<PinButton recipe={recipe}/>);

        // Act
        // Do nothing

        // Assert
        // Did the icon render?
        expect(screen.getByRole('img', {name: 'Unpin'})).toBeInTheDocument();

        // Did the link render?
        expect(screen.getByRole('button', {name: 'Unpin'})).toBeInTheDocument();
    });
});