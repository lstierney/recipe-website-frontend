import {renderWithProviders} from "../../utils/test-utils";
import AdminHomePage from "./AdminHomePage";
import {screen} from "@testing-library/react";
import React from "react";

/**
 * <li><Link to="/admin/addRecipe">Add a Recipe</Link></li>
 *                     <li><Link to="/admin/manageTags">Manage Tags</Link></li>
 *                     <li><Link to="/admin/manageIdeas">Manage Ideas</Link></li>
 */
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
});