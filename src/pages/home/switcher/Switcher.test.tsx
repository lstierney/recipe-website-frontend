import {renderWithProviders} from "../../../utils/test-utils";
import Switcher from "./Switcher";
import {screen} from "@testing-library/react";

describe('Switcher', () => {
    test('renders "random" radio input', () => {
        // Arrange
        renderWithProviders(<Switcher handleRadioChange={jest.fn()} selectedOption={'random'}/>);
        // Act - nothing

        // Assert
        const radioButton = screen.getByRole('radio', {name: /random/i});
        expect(radioButton).toBeInTheDocument();
        expect(radioButton).toHaveAttribute('value', 'random');

    });
    test('renders "latest" radio input', () => {
        // Arrange
        renderWithProviders(<Switcher handleRadioChange={jest.fn()} selectedOption={'random'}/>);
        // Act - nothing

        // Assert
        const radioButton = screen.getByRole('radio', {name: /latest/i});
        expect(radioButton).toBeInTheDocument();
        expect(radioButton).toHaveAttribute('value', 'latest');
    });
    test('"random" is checked', () => {
        // Arrange
        renderWithProviders(<Switcher handleRadioChange={jest.fn()} selectedOption={'random'}/>);
        // Act - nothing

        // Assert
        const radioButton = screen.getByRole('radio', {name: /random/i});
        expect(radioButton).toBeChecked();
    });
    test('"latest" is checked', () => {
        // Arrange
        renderWithProviders(<Switcher handleRadioChange={jest.fn()} selectedOption={'latest'}/>);
        // Act - nothing

        // Assert
        const radioButton = screen.getByRole('radio', {name: /latest/i});
        expect(radioButton).toBeChecked();
    });
});