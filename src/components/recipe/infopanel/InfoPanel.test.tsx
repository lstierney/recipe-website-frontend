import InfoPanel from './InfoPanel';
import {fireEvent, screen} from "@testing-library/react";
import {renderWithProviders} from "../../../utils/test-utils";
import {isAdminUser, isInEditingMode} from "../../../utils/auth";
import {useGetCrockeryQuery} from "../../../store/api";
import {RecipeType} from "../../../types/recipeType";

jest.mock('../../../utils/auth');
jest.mock('../../../store/api');

const mockGetCrockeryQuery = useGetCrockeryQuery as jest.MockedFunction<typeof useGetCrockeryQuery>;
const mockIsAdminUser = isAdminUser as jest.MockedFunction<typeof isAdminUser>;
const mockIsInEditingMode = isInEditingMode as jest.MockedFunction<typeof isInEditingMode>;

const RECIPE: RecipeType = {
    id: 1,
    name: 'Latest Recipe One',
    cookingTime: 30,
    basedOn: 'http://somerecipe.com',
    description: 'This is the description for the recipe',
    imageFileName: 'test.jpg',
    servedOn: undefined,
    cooked: 1,
    deleted: 0
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

const renderInfoPanel = () => {
    renderWithProviders(<InfoPanel
        setName={jest.fn()}
        setImage={jest.fn()}
        setBasedOn={jest.fn()}
        setCookingTime={jest.fn()}
        setCrockery={jest.fn()}
        setDescription={jest.fn()}
        setHeated={jest.fn()}
        recipe={RECIPE}/>
    );
}

describe('InfoPanel', () => {
    beforeEach(() => {
        mockGetCrockeryQuery.mockReturnValue({
            data: CROCKERY_LIST,
            refetch: jest.fn()
        });
    });
    test('renders Recipe name', () => {
        // Arrange
        renderInfoPanel();

        // Act
        // ...nothing

        // Assert
        const name = screen.getByText('Latest Recipe One', {exact: true});
        expect(name).toBeInTheDocument();
    });
    test('renders Recipe description', () => {
        // Arrange
        renderInfoPanel();

        // Act
        // ...nothing

        // Assert
        const description = screen.getByText('This is the description for the recipe', {exact: true});
        expect(description).toBeInTheDocument();
    });
    test('renders clock icon', () => {
        // Arrange
        renderInfoPanel();

        // Act
        // ...nothing

        // Assert
        const clockIcon = screen.getByAltText('Clock', {exact: true});
        expect(clockIcon).toBeInTheDocument();
    });
    test('renders Recipe "cooked" amount', () => {
        // Arrange
        renderInfoPanel();

        // Act
        // ...nothing

        // Assert
        const cooked = screen.getByText('x 1', {exact: true});
        expect(cooked).toBeInTheDocument();
    });
    test('renders "cooked" icon', () => {
        // Arrange
        renderInfoPanel();

        // Act
        // ...nothing

        // Assert
        const clockIcon = screen.getByAltText('Cooked', {exact: true});
        expect(clockIcon).toBeInTheDocument();
    });
    test('renders "Inspired By" link when recipe.basedOn is present', () => {
        // Arrange
        renderInfoPanel();

        // Act
        // ...nothing

        // Assert
        const inspiredBy = screen.getByRole('link', {name: 'Inspiration'});
        expect(inspiredBy).toBeInTheDocument();
        expect(inspiredBy).toHaveAttribute('href', 'http://somerecipe.com');
    });
    test('renders bulb icon when recipe.basedOn is present', () => {
        // Arrange
        renderInfoPanel();

        // Act
        // ...nothing

        // Assert
        const bulbIcon = screen.getByAltText('Light Bulb', {exact: true});
        expect(bulbIcon).toBeInTheDocument();
    });
    test('does not render "Inspired By" link when recipe.basedOn is not present', () => {
        // Arrange
        RECIPE.basedOn = '';
        renderInfoPanel();

        // Act
        // ...nothing

        // Assert
        const inspiredBy = screen.queryByRole('link', {name: 'Inspiration'});
        expect(inspiredBy).not.toBeInTheDocument();
    });
    test('does not render bulb icon when recipe.basedOn is not present', () => {
        // Arrange
        RECIPE.basedOn = '';
        renderInfoPanel();

        // Act
        // ...nothing

        // Assert
        const bulbIcon = screen.queryByAltText('Light Bulb', {exact: true});
        expect(bulbIcon).not.toBeInTheDocument();
    });
    // isAdmin tests
    test('renders name input with correct value when in edit mode', () => {
        // Arrange
        mockIsInEditingMode.mockReturnValue(true);
        renderInfoPanel();

        // Act
        // ...nothing

        // Assert
        const nameInput = screen.getByRole('textbox', {name: 'name'}) as HTMLInputElement;
        expect(nameInput).toBeInTheDocument();
        expect(nameInput.value).toBe('Latest Recipe One')
    });
    test('renders description textarea with correct value when in editing mode', () => {
        // Arrange
        mockIsInEditingMode.mockReturnValue(true);
        renderInfoPanel();

        // Act
        // ...nothing

        // Assert
        const textArea = screen.getByRole('textbox', {name: 'description'}) as HTMLTextAreaElement;
        expect(textArea).toBeInTheDocument();
        expect(textArea.value).toBe('This is the description for the recipe')
    });
    test('renders cooking time input with correct value when in edit mode', () => {
        // Arrange
        mockIsInEditingMode.mockReturnValue(true);
        renderInfoPanel();

        // Act
        // ...nothing

        // Assert
        const cookingTimeInput = screen.getByRole('spinbutton', {name: 'cookingTime'}) as HTMLInputElement;
        expect(cookingTimeInput).toBeInTheDocument();
        expect(cookingTimeInput.value).toBe("30");
    });
    test('renders "based on" input with correct value when in edit mode', () => {
        // Arrange
        RECIPE.basedOn = 'http://somerecipe.com';
        mockIsInEditingMode.mockReturnValue(true);
        renderInfoPanel();

        // Act
        // ...nothing

        // Assert
        const basedOnInput = screen.getByRole('textbox', {name: 'basedOn'}) as HTMLInputElement;
        expect(basedOnInput).toBeInTheDocument();
        expect(basedOnInput.value).toBe('http://somerecipe.com');
    });
    test('renders image when recipe.imageFileName is present and user is not admin', () => {
        // Arrange
        mockIsAdminUser.mockReturnValue(false);
        renderInfoPanel();

        // Act
        // ...nothing

        // Assert
        const recipeImage = screen.getByRole('img', {name: 'Latest Recipe One'})
        expect(recipeImage).toBeInTheDocument();

    });
    test('renders image when recipe.imageFileName is present and user is admin', () => {
        // Arrange
        mockIsAdminUser.mockReturnValue(true);
        renderInfoPanel();

        // Act
        // ...nothing

        // Assert
        const recipeImage = screen.getByRole('img', {name: 'Latest Recipe One'})
        expect(recipeImage).toBeInTheDocument();
    });
    test('renders filepicker when recipe.imageFileName is not present and in edit mode', () => {
        // Arrange
        mockIsInEditingMode.mockReturnValue(true);
        RECIPE.imageFileName = '';
        renderInfoPanel();

        // Act
        // ...nothing

        // Assert
        const fileInputButton = screen.getByLabelText('Choose an image:', {exact: true});
        expect(fileInputButton).toBeInTheDocument();
    });
    test('does not render image when recipe.imageFileName is not present and in edit mode', () => {
        // Arrange
        mockIsInEditingMode.mockReturnValue(true);
        RECIPE.imageFileName = '';
        renderInfoPanel();

        // Act
        // ...nothing

        // Assert
        const recipeImage = screen.queryByRole('img', {name: 'Latest Recipe One'})
        expect(recipeImage).not.toBeInTheDocument();
    });
    test('renders filepicker when recipe.imageFileName is present, in edit mode and user clicks image', () => {
        // Arrange
        mockIsInEditingMode.mockReturnValue(true);
        RECIPE.imageFileName = 'test.jpg'
        renderInfoPanel();

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
            id: 1,
            crockery: {
                id: 1,
                description: 'White plate'
            },
            heated: true
        };
        renderInfoPanel();

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
        renderInfoPanel();

        // Act
        // -- nothing

        // Assert
        const servingPlateImage = screen.queryByRole('img', {name: 'Serving Plate'})
        expect(servingPlateImage).not.toBeInTheDocument();
    });
    test('renders select list for crockery when in edit mode', () => {
        // Arrange
        mockIsInEditingMode.mockReturnValue(true);
        renderInfoPanel();

        // Act
        // -- nothing

        // Assert
        const selectList = screen.getByRole('combobox', {name: 'Crockery:'})
        expect(selectList).toBeInTheDocument();

        expect(screen.getAllByRole('option').length).toBe(3); // this includes "please select"
    });
    test('does not render select list for crockery when not in edit mode', () => {
        // Arrange
        mockIsInEditingMode.mockReturnValue(false);
        renderInfoPanel();

        // Act
        // -- nothing

        // Assert
        const selectList = screen.queryByRole('combobox', {name: 'Crockery:'})
        expect(selectList).not.toBeInTheDocument();

        expect(screen.queryAllByRole('option').length).toBe(0);
    });
    test('renders radio for "heated" when in edit mode', () => {
        // Arrange
        mockIsInEditingMode.mockReturnValue(true);
        renderInfoPanel();

        // Act
        // -- nothing

        // Assert
        const radios = screen.getAllByRole('radio', {name: 'Heated radio'})
        expect(radios.length).toBe(2);
    });
    test('renders cooking time correct when cooking time < 1 hour', () =>{
        renderInfoPanel();

        // Act
        // ...nothing

        // Assert
        const cookingTime = screen.getByText('30 mins', {exact: true});
        expect(cookingTime).toBeInTheDocument();
    });
    test('renders cooking time correct when cooking time == 1 hour', () =>{
        RECIPE.cookingTime = 60;
        renderInfoPanel();

        // Act
        // ...nothing

        // Assert
        const cookingTime = screen.getByText('1 hr', {exact: true});
        expect(cookingTime).toBeInTheDocument();
    });
    test('renders cooking time correct when cooking time > 1 hour', () =>{
        RECIPE.cookingTime = 90;
        renderInfoPanel();

        // Act
        // ...nothing

        // Assert
        const cookingTime = screen.getByText('1 hr 30 mins', {exact: true});
        expect(cookingTime).toBeInTheDocument();
    });
    test('renders cooking time correct when cooking time == 2 hours', () =>{
        RECIPE.cookingTime = 120;
        renderInfoPanel();

        // Act
        // ...nothing

        // Assert
        const cookingTime = screen.getByText('2 hrs', {exact: true});
        expect(cookingTime).toBeInTheDocument();
    });
    test('renders cooking time correct when cooking time > 2 hours', () =>{
        RECIPE.cookingTime = 150;
        renderInfoPanel();

        // Act
        // ...nothing

        // Assert
        const cookingTime = screen.getByText('2 hrs 30 mins', {exact: true});
        expect(cookingTime).toBeInTheDocument();
    });
});