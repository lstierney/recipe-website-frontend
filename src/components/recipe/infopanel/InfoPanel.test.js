import InfoPanel from './InfoPanel';
import {screen} from "@testing-library/react";
import {renderWithProviders} from "../../../utils/test-utils";
import {isAdminUser} from "../../../utils/auth";

jest.mock('../../../utils/auth');

const RECIPE = {
    id: 1,
    name: 'Latest Recipe One',
    cookingTime: 30,
    basedOn: 'http://somerecipe.com',
    description: 'This is the description for the recipe',
    imageFileName: 'test.jpg'
};

describe('InfoPanel', () => {
    test('renders Recipe name', () => {
        // Arrange
        renderWithProviders(<InfoPanel recipe={RECIPE}/>);

        // Act
        // ...nothing

        // Assert
        const name = screen.getByText('Latest Recipe One', {exact: true});
        expect(name).toBeInTheDocument();
    });
    test('renders Recipe description', () => {
        // Arrange
        renderWithProviders(<InfoPanel recipe={RECIPE}/>);

        // Act
        // ...nothing

        // Assert
        const description = screen.getByText('This is the description for the recipe', {exact: true});
        expect(description).toBeInTheDocument();
    });
    test('renders Recipe cooking time', () => {
        // Arrange
        renderWithProviders(<InfoPanel recipe={RECIPE}/>);

        // Act
        // ...nothing

        // Assert
        const cookingTime = screen.getByText('Cook: 30 mins', {exact: true});
        expect(cookingTime).toBeInTheDocument();
    });
    test('renders clock icon', () => {
        // Arrange
        renderWithProviders(<InfoPanel recipe={RECIPE}/>);

        // Act
        // ...nothing

        // Assert
        const clockIcon = screen.getByAltText('Clock', {exact: true});
        expect(clockIcon).toBeInTheDocument();
    });
    test('renders "Inspired By" link when recipe.basedOn is present', () => {
        // Arrange
        renderWithProviders(<InfoPanel recipe={RECIPE}/>);

        // Act
        // ...nothing

        // Assert
        const inspiredBy = screen.getByRole('link', {name: 'Inspired By'});
        expect(inspiredBy).toBeInTheDocument();
        expect(inspiredBy).toHaveAttribute('href', 'http://somerecipe.com');
    });
    test('renders bulb icon when recipe.basedOn is present', () => {
        // Arrange
        renderWithProviders(<InfoPanel recipe={RECIPE}/>);

        // Act
        // ...nothing

        // Assert
        const bulbIcon = screen.getByAltText('Light Bulb', {exact: true});
        expect(bulbIcon).toBeInTheDocument();
    });
    test('does not render "Inspired By" link when recipe.basedOn is not present', () => {
        // Arrange
        RECIPE.basedOn = '';
        renderWithProviders(<InfoPanel recipe={RECIPE}/>);

        // Act
        // ...nothing

        // Assert
        const inspiredBy = screen.queryByRole('link', {name: 'Inspired By'});
        expect(inspiredBy).not.toBeInTheDocument();
    });
    test('does not render bulb icon when recipe.basedOn is not present', () => {
        // Arrange
        RECIPE.basedOn = '';
        renderWithProviders(<InfoPanel recipe={RECIPE}/>);

        // Act
        // ...nothing

        // Assert
        const bulbIcon = screen.queryByAltText('Light Bulb', {exact: true});
        expect(bulbIcon).not.toBeInTheDocument();
    });
    // isAdmin tests
    test('renders name input with correct value when user isAdmin', () => {
        // Arrange
        isAdminUser.mockReturnValue(true);
        renderWithProviders(<InfoPanel recipe={RECIPE}/>);

        // Act
        // ...nothing

        // Assert
        const nameInput = screen.getByRole('textbox', {name: 'name'})
        expect(nameInput).toBeInTheDocument();
        expect(nameInput.value).toBe('Latest Recipe One')
    });
    test('renders description textarea with correct value when user isAdmin', () => {
        // Arrange
        isAdminUser.mockReturnValue(true);
        renderWithProviders(<InfoPanel recipe={RECIPE}/>);

        // Act
        // ...nothing

        // Assert
        const textArea = screen.getByRole('textbox', {name: 'description'})
        expect(textArea).toBeInTheDocument();
        expect(textArea.value).toBe('This is the description for the recipe')
    });
    test('renders cooking time input with correct value when user isAdmin', () => {
        // Arrange
        isAdminUser.mockReturnValue(true);
        renderWithProviders(<InfoPanel recipe={RECIPE}/>);

        // Act
        // ...nothing

        // Assert
        const cookingTimeInput = screen.getByRole('spinbutton', {name: 'cookingTime'})
        expect(cookingTimeInput).toBeInTheDocument();
        expect(cookingTimeInput.value).toBe("30");
    });
    test('renders "based on" input with correct value when user isAdmin', () => {
        // Arrange
        RECIPE.basedOn = 'http://somerecipe.com';
        isAdminUser.mockReturnValue(true);
        renderWithProviders(<InfoPanel recipe={RECIPE}/>);

        // Act
        // ...nothing

        // Assert
        const basedOnInput = screen.getByRole('textbox', {name: 'basedOn'})
        expect(basedOnInput).toBeInTheDocument();
        expect(basedOnInput.value).toBe('http://somerecipe.com');
    });
});