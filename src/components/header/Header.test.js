import Header from './Header';
import {screen} from "@testing-library/react";
import {renderWithProviders} from "../../utils/test-utils";
import {getSubject, isAdminUser} from "../../utils/auth";

jest.mock('../../utils/auth');

describe('Header', () => {
    test('renders Logo', () => {
        // Arrange
        renderWithProviders(<Header/>);

        // Act
        // ...nothing

        // Assert
        const logo = screen.getByAltText("Logo", {exact: true});
        expect(logo).toBeInTheDocument();
    });
    test('renders Home link', () => {
        // Arrange
        renderWithProviders(<Header/>);

        // Act
        // ...nothing

        // Assert
        const link = screen.getByRole('link', {name: 'Home'});
        expect(link).toHaveAttribute('href', '/');
    });
    test('renders Recipes link', () => {
        // Arrange
        renderWithProviders(<Header/>);

        // Act
        // ...nothing

        // Assert
        const link = screen.getByRole('link', {name: 'Recipes'});
        expect(link).toHaveAttribute('href', '/recipes');
    });
    test('renders Convertors link', () => {
        // Arrange
        renderWithProviders(<Header/>);

        // Act
        // ...nothing

        // Assert
        const link = screen.getByRole('link', {name: 'Convertors'});
        expect(link).toHaveAttribute('href', '/convertors');
    });
    test('renders Login link when not admin', () => {
        // Arrange
        isAdminUser.mockReturnValue(false);
        renderWithProviders(<Header/>);

        // Act
        // ...nothing

        // Assert
        const link = screen.getByRole('link', {name: 'Login'});
        expect(link).toHaveAttribute('href', '/login');
    });
    test('renders Logout link when admin', () => {
        // Arrange
        isAdminUser.mockReturnValue(true);
        getSubject.mockReturnValue('lawrence')
        renderWithProviders(<Header/>);

        // Act
        // ...nothing

        // Assert
        const link = screen.getByRole('link', {name: 'Logout ( lawrence )'});
        expect(link).toHaveAttribute('href', '/logout');
    });
});