import {screen} from "@testing-library/react";
import RecipeLinkParser from "./RecipeLinkParser";
import {renderWithProviders} from "../../../utils/test-utils";

const renderParser = (input: string) => {
    renderWithProviders(<RecipeLinkParser dataTestId="component">{input}</RecipeLinkParser>)
}

describe('Recipe Preview component', () => {
    it('renders plain text', () => {
        // Arrange
        const input = 'This is plain text';
        renderParser(input);

        // Act
        // -- nothing

        // Assert
        const text = screen.getByText(input, {exact: true});
        expect(text).toBeInTheDocument();
    });
    it('renders recipe link text capitalised with hyphens removed', () => {
        // Arrange
        renderParser('[r]sweet-chilli-noodles[/r]');

        // Act
        // -- nothing

        // Assert
        const text = screen.getByText('Sweet Chilli Noodles', {exact: true});
        expect(text).toBeInTheDocument();
    });
    it('renders recipe links as hyperlinks to appropriate recipe', () => {
        // Arrange
        renderParser('[r]sweet-chilli-noodles[/r]');

        // Act
        // -- nothing

        // Assert
        const link = screen.getByRole('link', {exact: true});
        expect(link).toHaveAttribute('href', '/recipes/sweet-chilli-noodles')
    });
    it('renders text correctly when recipe link is in middle of string', () => {
        // Arrange
        renderParser('This is a test for [r]sweet-chilli-noodles[/r] in the middle of string');

        // Act
        // -- nothing

        // Assert
        expect(screen.getByTestId('component').textContent).toBe('This is a test for Sweet Chilli Noodles in the middle of string');
    });
    it('renders recipe hyperlinks correctly when recipe link is in middle of string', () => {
        // Arrange
        renderParser('This is a test for [r]sweet-chilli-noodles[/r] in the middle of string');

        // Act
        // -- nothing

        // Assert
        const link = screen.getByRole('link', {exact: true});
        expect(link).toHaveAttribute('href', '/recipes/sweet-chilli-noodles')
    });
    it('renders text with multiple recipe links correctly', () => {
        // Arrange
        renderParser('This is a test for [r]sweet-chilli-noodles[/r] and for [r]bread[/r] aswell');

        // Act
        // -- nothing

        // Assert
        expect(screen.getByTestId('component').textContent).toBe('This is a test for Sweet Chilli Noodles and for Bread aswell');
    });
    it('renders multiple recipe links correctly', () => {
        // Arrange
        renderParser('This is a test for [r]sweet-chilli-noodles[/r] and for [r]bread[/r] aswell');

        // Act
        // -- nothing

        // Assert
        const links = screen.getAllByRole('link', {exact: true});
        expect(links).toHaveLength(2);
        expect(links[0]).toHaveAttribute('href', '/recipes/sweet-chilli-noodles')
        expect(links[1]).toHaveAttribute('href', '/recipes/bread')
    });
});