import Hamburger from "./Hamburger";
import {screen} from "@testing-library/react";
import {renderWithProviders} from "../../../utils/test-utils";


describe('Hamburger menu', () => {
    test('renders Home link', () => {
        // Arrange
        renderWithProviders(<Hamburger/>);

        // Act
        // ...nothing

        // Assert
        const link = screen.getByRole('link', {name: 'Home'});
        expect(link).toHaveAttribute('href', '/');
    });
    test('renders Recipes link', () => {
        // Arrange
        renderWithProviders(<Hamburger/>);

        // Act
        // ...nothing

        // Assert
        const link = screen.getByRole('link', {name: 'Recipes'});
        expect(link).toHaveAttribute('href', '/recipes');
    });
    test('renders Convertors link', () => {
        // Arrange
        renderWithProviders(<Hamburger/>);

        // Act
        // ...nothing

        // Assert
        const link = screen.getByRole('link', {name: 'Convertors'});
        expect(link).toHaveAttribute('href', '/convertors');
    });
    test('renders Login link', () => {
        // Arrange
        renderWithProviders(<Hamburger/>);

        // Act
        // ...nothing

        // Assert
        const link = screen.getByRole('link', {name: 'Login'});
        expect(link).toHaveAttribute('href', '/login');
    });
});