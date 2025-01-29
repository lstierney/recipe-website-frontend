import {renderWithProviders} from "../../utils/test-utils";
import AdminHomePage from "./AdminHomePage";
import {screen} from "@testing-library/react";
import React from "react";

describe('AdminHomePage', () => {
    test('renders "Add a Recipe" link', async () => {
        // Arrange
        renderWithProviders(<AdminHomePage/>);

        // Assert
        expect(screen.getByRole('heading', {name: /Admin/i})).toBeInTheDocument();
        expect(screen.getByText('Add a Recipe')).toHaveAttribute('href', '/admin/addRecipe');
    });
    test('renders "Manage Tags" link', async () => {
        // Arrange
        renderWithProviders(<AdminHomePage/>);

        // Assert
        expect(screen.getByText('Manage Tags')).toHaveAttribute('href', '/admin/manageTags');
    });
    test('renders "Manage Ideas" link', async () => {
        // Arrange
        renderWithProviders(<AdminHomePage/>);

        // Assert
        expect(screen.getByText('Manage Ideas')).toHaveAttribute('href', '/admin/manageIdeas');
    });
    test('renders "Manage Recipes" link', async () => {
        // Arrange
        renderWithProviders(<AdminHomePage/>);

        // Assert
        expect(screen.getByText('Manage Recipes')).toHaveAttribute('href', '/admin/manageRecipes');
    });
});