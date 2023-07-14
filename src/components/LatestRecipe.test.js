import React from 'react';
import {useGetLatestRecipesQuery} from '../store/api';
import {screen} from "@testing-library/react";
import LatestRecipe from './LatestRecipe';
import {renderWithProviders} from "../utils/test-utils";

jest.mock('../store/api');

describe('LatestRecipe', () => {
    test('renders recipe link when data is available', () => {
        // Arrange
        const recipeData = {
            id: 1,
            name: 'Test Recipe',
        };
        useGetLatestRecipesQuery.mockReturnValueOnce({
            data: recipeData,
        });
        renderWithProviders(<LatestRecipe/>);

        // Act


        // Assert
        const recipeLink = screen.getByText(recipeData.name, {exact: true});
        expect(recipeLink).toBeInTheDocument();
    });

    test('renders "No recipe found" when data is undefined', () => {
        // Arrange
        useGetLatestRecipesQuery.mockReturnValueOnce({
            data: undefined,
        });
        renderWithProviders(<LatestRecipe/>);

        // Act

        // Assert
        const noRecipeText = screen.getByText('No recipe found', {exact: true});
        expect(noRecipeText).toBeInTheDocument();
    });

    test('renders "No recipe found" when data is an empty object', () => {
        // Arrange
        useGetLatestRecipesQuery.mockReturnValueOnce({
            data: {},
        });
        renderWithProviders(<LatestRecipe/>);

        // Act


        // Assert
        const noRecipeText = screen.getByText('No recipe found', {exact: true});
        expect(noRecipeText).toBeInTheDocument();
    });
});
