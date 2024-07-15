import Header from './Header';
import {screen} from "@testing-library/react";
import {renderWithProviders} from "../../utils/test-utils";
import {getSubject, isAdminUser} from "../../utils/auth";

jest.mock('../../utils/auth');

const mockIsAdminUser = isAdminUser as jest.MockedFunction<typeof isAdminUser>;
const mockGetSubject = getSubject as jest.MockedFunction<typeof getSubject>;

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
        const links = screen.getAllByRole('link', {name: 'Home'});
        links.forEach(link => {
            expect(link).toHaveAttribute('href', '/');
        })

    });
    test('renders Recipes link', () => {
        // Arrange
        renderWithProviders(<Header/>);

        // Act
        // ...nothing

        // Assert
        const links = screen.getAllByRole('link', {name: 'Recipes'});

        links.forEach(link => {
            expect(link).toHaveAttribute('href', '/recipes');
        })
    });
    test('renders Pinned link', () => {
        // Arrange
        renderWithProviders(<Header/>);

        // Act
        // ...nothing

        // Assert
        const links = screen.getAllByRole('link', {name: 'Pinned'});

        links.forEach(link => {
            expect(link).toHaveAttribute('href', '/pinned');
        })
    });
    test('renders Convertors link', () => {
        // Arrange
        renderWithProviders(<Header/>);

        // Act
        // ...nothing

        // Assert
        const links = screen.getAllByRole('link', {name: 'Convertors'});
        links.forEach(link => {
            expect(link).toHaveAttribute('href', '/convertors');
        })

    });
    test('renders Login link when not admin', () => {
        // Arrange
        mockIsAdminUser.mockReturnValue(false);
        renderWithProviders(<Header/>);

        // Act
        // ...nothing

        // Assert
        const links = screen.getAllByRole('link', {name: 'Login'});
        links.forEach(link => {
            expect(link).toHaveAttribute('href', '/login');
        })

    });
    test('renders Logout link when admin', () => {
        // Arrange
        mockIsAdminUser.mockReturnValue(true);
        mockGetSubject.mockReturnValue('lawrence')
        renderWithProviders(<Header/>);

        // Act
        // ...nothing

        // Assert
        const link = screen.getByRole('link', {name: 'Logout ( lawrence )'});
        expect(link).toHaveAttribute('href', '/logout');
    });
});