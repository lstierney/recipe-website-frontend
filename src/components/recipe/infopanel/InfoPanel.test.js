import InfoPanel from './InfoPanel';
import {fireEvent, screen} from "@testing-library/react";
import {renderWithProviders} from "../../../utils/test-utils";
import {isAdminUser, isInEditingMode} from "../../../utils/auth";
import {useGetCrockeryQuery} from "../../../store/api";

jest.mock('../../../utils/auth');
jest.mock('../../../store/api');

const RECIPE = {
    id: 1,
    name: 'Latest Recipe One',
    cookingTime: 30,
    basedOn: 'http://somerecipe.com',
    description: 'This is the description for the recipe',
    imageFileName: 'test.jpg'
};

const CROCKERY_LIST = [
    {
        id: 1,
        description: 'White Plates'
    },
    {
        id: 2,
        description: 'Green Bowls'
    }
];

describe('InfoPanel', () => {
    beforeEach(() => {
        useGetCrockeryQuery.mockReturnValue({
            data: CROCKERY_LIST,
        });
    });
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
        const cookingTime = screen.getByText('30 mins', {exact: true});
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
        const inspiredBy = screen.getByRole('link', {name: 'Inspiration'});
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
        const inspiredBy = screen.queryByRole('link', {name: 'Inspiration'});
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
    test('renders name input with correct value when in edit mode', () => {
        // Arrange
        isInEditingMode.mockReturnValue(true);
        renderWithProviders(<InfoPanel recipe={RECIPE}/>);

        // Act
        // ...nothing

        // Assert
        const nameInput = screen.getByRole('textbox', {name: 'name'})
        expect(nameInput).toBeInTheDocument();
        expect(nameInput.value).toBe('Latest Recipe One')
    });
    test('renders description textarea with correct value when in editing mode', () => {
        // Arrange
        isInEditingMode.mockReturnValue(true);
        renderWithProviders(<InfoPanel recipe={RECIPE}/>);

        // Act
        // ...nothing

        // Assert
        const textArea = screen.getByRole('textbox', {name: 'description'})
        expect(textArea).toBeInTheDocument();
        expect(textArea.value).toBe('This is the description for the recipe')
    });
    test('renders cooking time input with correct value when in edit mode', () => {
        // Arrange
        isInEditingMode.mockReturnValue(true);
        renderWithProviders(<InfoPanel recipe={RECIPE}/>);

        // Act
        // ...nothing

        // Assert
        const cookingTimeInput = screen.getByRole('spinbutton', {name: 'cookingTime'})
        expect(cookingTimeInput).toBeInTheDocument();
        expect(cookingTimeInput.value).toBe("30");
    });
    test('renders "based on" input with correct value when in edit mode', () => {
        // Arrange
        RECIPE.basedOn = 'http://somerecipe.com';
        isInEditingMode.mockReturnValue(true);
        renderWithProviders(<InfoPanel recipe={RECIPE}/>);

        // Act
        // ...nothing

        // Assert
        const basedOnInput = screen.getByRole('textbox', {name: 'basedOn'})
        expect(basedOnInput).toBeInTheDocument();
        expect(basedOnInput.value).toBe('http://somerecipe.com');
    });
    test('renders image when recipe.imageFileName is present and user is not admin', () => {
        // Arrange
        isAdminUser.mockReturnValue(false);
        renderWithProviders(<InfoPanel recipe={RECIPE}/>);

        // Act
        // ...nothing

        // Assert
        const recipeImage = screen.getByRole('img', {name: 'Latest Recipe One'})
        expect(recipeImage).toBeInTheDocument();

    });
    test('renders image when recipe.imageFileName is present and user is admin', () => {
        // Arrange
        isAdminUser.mockReturnValue(true);
        renderWithProviders(<InfoPanel recipe={RECIPE}/>);

        // Act
        // ...nothing

        // Assert
        const recipeImage = screen.getByRole('img', {name: 'Latest Recipe One'})
        expect(recipeImage).toBeInTheDocument();
    });
    test('renders filepicker when recipe.imageFileName is not present and in edit mode', () => {
        // Arrange
        isInEditingMode.mockReturnValue(true);
        RECIPE.imageFileName = undefined;
        renderWithProviders(<InfoPanel recipe={RECIPE}/>);

        // Act
        // ...nothing

        // Assert
        const fileInputButton = screen.getByLabelText('Choose an image:', {exact: true});
        expect(fileInputButton).toBeInTheDocument();
    });
    test('does not render image when recipe.imageFileName is not present and in edit mode', () => {
        // Arrange
        isInEditingMode.mockReturnValue(true);
        RECIPE.imageFileName = undefined;
        renderWithProviders(<InfoPanel recipe={RECIPE}/>);

        // Act
        // ...nothing

        // Assert
        const recipeImage = screen.queryByRole('img', {name: 'Latest Recipe One'})
        expect(recipeImage).not.toBeInTheDocument();
    });
    test('renders filepicker when recipe.imageFileName is present, in edit mode and user clicks image', () => {
        // Arrange
        isInEditingMode.mockReturnValue(true);
        RECIPE.imageFileName = 'test.jpg'
        renderWithProviders(<InfoPanel recipe={RECIPE}/>);

        // Act
        fireEvent.click(screen.getByRole('img', {name: 'Latest Recipe One'}));

        // Assert
        const fileInputButton = screen.getByLabelText('Choose an image:', {exact: true});
        expect(fileInputButton).toBeInTheDocument();

        const recipeImage = screen.queryByRole('img', {name: 'Latest Recipe One'})
        expect(recipeImage).not.toBeInTheDocument();
    });
    test('renders "served on" details when data is present and not in edit mode', () => {
        // Arrange
        RECIPE.servedOn = {
            crockery: {
                id: 1
            },
            heated: true
        };
        renderWithProviders(<InfoPanel recipe={RECIPE}/>);

        // Act
        // -- nothing

        // Assert
        const servingPlateImage = screen.getByRole('img', {name: 'Serving Plate'})
        expect(servingPlateImage).toBeInTheDocument();

        const servedOnString = screen.getByText('Heated White Plates', {exact: true});
        expect(servedOnString).toBeInTheDocument();
    });
    test('does not render "served on" details when data is not present and not in edit mode', () => {
        // Arrange
        RECIPE.servedOn = undefined;
        renderWithProviders(<InfoPanel recipe={RECIPE}/>);

        // Act
        // -- nothing

        // Assert
        const servingPlateImage = screen.queryByRole('img', {name: 'Serving Plate'})
        expect(servingPlateImage).not.toBeInTheDocument();
    });
    test('renders select list for crockery when in edit mode', () => {
        // Arrange
        isInEditingMode.mockReturnValue(true);
        renderWithProviders(<InfoPanel recipe={RECIPE}/>);

        // Act
        // -- nothing

        // Assert
        const selectList = screen.getByRole('combobox', {name: 'Crockery:'})
        expect(selectList).toBeInTheDocument();

        expect(screen.getAllByRole('option').length).toBe(3); // this includes "please select"
    });
    test('does not render select list for crockery when not in edit mode', () => {
        // Arrange
        isInEditingMode.mockReturnValue(false);
        renderWithProviders(<InfoPanel recipe={RECIPE}/>);

        // Act
        // -- nothing

        // Assert
        const selectList = screen.queryByRole('combobox', {name: 'Crockery:'})
        expect(selectList).not.toBeInTheDocument();

        expect(screen.queryAllByRole('option').length).toBe(0);
    });
    test('renders radio for "heated" when in edit mode', () => {
        // Arrange
        isInEditingMode.mockReturnValue(true);
        renderWithProviders(<InfoPanel recipe={RECIPE}/>);

        // Act
        // -- nothing

        // Assert
        const radios = screen.getAllByRole('radio', {name: 'Heated radio'})
        expect(radios.length).toBe(2);
    });
});