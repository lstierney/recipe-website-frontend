import {renderWithProviders} from "../../utils/test-utils";
import {fireEvent, screen} from "@testing-library/react";
import Button from "./Button";

describe('Button component', () => {


    test('renders', () => {
        // Arrange
        renderWithProviders(<Button></Button>);

        // Act
        // ... nothing

        // Assert
        expect(screen.getAllByRole('button', {})).toHaveLength(1);
    });
    test('renders children', () => {
        // Arrange
        renderWithProviders(<Button>Button Text</Button>);

        // Act
        // ... nothing

        // Assert
        expect(screen.getByText('Button Text', {exact: true})).toBeInTheDocument();
    });
    test('has onClick attribute', () => {
        // Arrange
        const mockOnClick = jest.fn(); // Create a mock function
        renderWithProviders(<Button onClick={mockOnClick}>Button Text</Button>);

        // Act
        fireEvent.click(screen.getByRole('button'));

        // Assert
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
    test('has type attribute', () => {
        // Arrange

        renderWithProviders(<Button type="button">Button Text</Button>);

        // Act
        // nothing

        // Assert
        expect(screen.getByText('Button Text', {exact: true})).toHaveAttribute('type', 'button');
    });
});