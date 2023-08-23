import {renderWithProviders} from "../../utils/test-utils";
import {fireEvent, screen} from "@testing-library/react";
import Button from "./Button";

const onClick = jest.fn();

describe('Button component', () => {


    test('renders', () => {
        // Arrange
        renderWithProviders(<Button type="button" onClick={onClick}>Button Text</Button>);

        // Act
        // ... nothing

        // Assert
        expect(screen.getAllByRole('button', {})).toHaveLength(1);
    });
    test('renders children', () => {
        // Arrange
        renderWithProviders(<Button type="button" onClick={onClick}>Button Text</Button>);

        // Act
        // ... nothing

        // Assert
        expect(screen.getByText('Button Text', {exact: true})).toBeInTheDocument();
    });
    test('has onClick attribute', () => {
        // Arrange
        const mockOnClick = jest.fn(); // Create a mock function
        renderWithProviders(<Button type="button" onClick={mockOnClick}>Button Text</Button>);

        // Act
        fireEvent.click(screen.getByRole('button'));

        // Assert
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
    test('has type attribute', () => {
        // Arrange

        renderWithProviders(<Button type="button" onClick={onClick}>Button Text</Button>);

        // Act
        // nothing

        // Assert
        expect(screen.getByText('Button Text', {exact: true})).toHaveAttribute('type', 'button');
    });
    test('has aria-label attribute', () => {
        // Arrange

        renderWithProviders(<Button type="button" onClick={onClick} ariaLabel="label for button">Button Text</Button>);

        // Act
        // nothing

        // Assert
        expect(screen.getByText('Button Text', {exact: true})).toHaveAttribute('aria-label', 'label for button');
    });
});