import Hamburger from "./Hamburger";
import {screen} from "@testing-library/react";
import {renderWithProviders} from "../../../utils/test-utils";
import {getSubject, isAdminUser} from "../../../utils/auth";

jest.mock('../../../utils/auth');

const mockIsAdminUser = isAdminUser as jest.MockedFunction<typeof isAdminUser>;
const mockGetSubject = getSubject as jest.MockedFunction<typeof getSubject>;

const loginAsAdmin = () => {
    mockIsAdminUser.mockReturnValue(true);
    mockGetSubject.mockReturnValue('lawrence')
}

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
    test('renders "Pinned" link', () => {
        // Arrange
        renderWithProviders(<Hamburger/>);

        // Act
        // ...nothing

        // Assert
        const link = screen.getByRole('link', {name: 'Pinned'});
        expect(link).toHaveAttribute('href', '/pinned');
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
    test('does not render "Login" link when logged in', () => {
        // Arrange
        loginAsAdmin();
        renderWithProviders(<Hamburger/>);

        // Act
        // ...nothing

        // Assert
        expect(screen.queryByRole('link', {name: 'Login'})).not.toBeInTheDocument();
    });
    test('renders "Logout" link when logged in', () => {
        // Arrange
        loginAsAdmin();
        renderWithProviders(<Hamburger/>);

        // Act
        // ...nothing

        // Assert
        const link = screen.getByRole('link', {name: 'Logout'});
        expect(link).toHaveAttribute('href', '/logout');
    });
    test('does not render "Logout" link when not logged in', () => {
        // Arrange
        renderWithProviders(<Hamburger/>);

        // Act
        // ...nothing

        // Assert
        expect(screen.queryByRole('link', {name: 'Logout'})).not.toBeInTheDocument();
    });
    test('does not render "Ideas" link when not logged in', () => {
        // Arrange
        renderWithProviders(<Hamburger/>);

        // Act
        // ...nothing

        // Assert
        expect(screen.queryByRole('link', {name: 'Ideas'})).not.toBeInTheDocument();
    });
    test('renders "Ideas" link when logged in', () => {
        // Arrange
        loginAsAdmin()
        renderWithProviders(<Hamburger/>);

        // Act
        // ...nothing

        // Assert
        const link = screen.getByRole('link', {name: 'Ideas'});
        expect(link).toHaveAttribute('href', '/ideas');
    });
});