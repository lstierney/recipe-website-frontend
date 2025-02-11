import React from 'react';
import {screen, within} from '@testing-library/react';
import Pinned from './Pinned';
import {renderWithProviders} from "../../utils/test-utils";

const mockRecipe = {
    cooked: 2,
    cookingTime: 60,
    description: "A Test Recipe description",
    name: "Test Recipe",
    imageFileNames: ['image4.jpg'],
    imageFolderPath: '/opt/recipe-website/images/2 - Test Recipe/'
};

const mockJsonPromise = Promise.resolve(mockRecipe); // Corrected to return a single recipe object
const mockFetchPromise = Promise.resolve({
    json: () => mockJsonPromise,
    ok: true
});

describe('Pinned Component', () => {
    beforeEach(() => {
        Storage.prototype.getItem = jest.fn(() => JSON.stringify([mockRecipe.name]));
        global.fetch = jest.fn().mockImplementation((url, options) => {
            console.log(`Fetch mock called with URL: ${url} and options: ${JSON.stringify(options)}`);
            return mockFetchPromise;
        });
        process.env.REACT_APP_API_URL = 'http://localhost:8080'; // Ensure the baseUrl is set
    });

    afterEach(() => {
        jest.resetAllMocks(); // Reset all mocks after each test
    });

    test('renders Recipe Preview when Pinned Recipes found in local storage', async () => {
        // Arrange
        renderWithProviders(<Pinned/>);

        // Assert
        expect(screen.getByRole('heading', {name: /Pinned Recipes/i})).toBeInTheDocument();
        expect(await screen.findByRole('button', {name: /Unpin All/i})).toBeInTheDocument();

        // Check RecipesList title & image.
        const listitem = screen.getByTestId('listitem');
        const {getByText} = within(listitem);
        expect(getByText(mockRecipe.name)).toBeInTheDocument();
        expect(screen.getByAltText('Test Recipe')).toHaveAttribute('src', 'http://localhost:8080/opt/recipe-website/images/2 - Test Recipe/image4.jpg');
    });

    test('renders "No Recipes found" no Pinned Recipes found in local storage', async () => {
        // Arrange
        Storage.prototype.getItem = jest.fn(() => JSON.stringify([]));
        renderWithProviders(<Pinned/>);

        // Assert
        expect(screen.getByRole('heading', {name: /No recipes found/i})).toBeInTheDocument();

        // And there should be no Recipe previews
        expect(screen.queryByTestId('listitem')).not.toBeInTheDocument();
    });
});
