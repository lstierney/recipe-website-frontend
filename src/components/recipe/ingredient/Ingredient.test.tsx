import {useGetUnitsQuery} from "../../../store/api";
import {renderWithProviders} from "../../../utils/test-utils";
import {screen} from "@testing-library/react";
import Ingredient from "./Ingredient";
import {IngredientType} from "../../../types/ingredientType";
import {UnitType} from "../../../types/unitType";

jest.mock('../../../store/api');

const mockGetUnitsQuery = useGetUnitsQuery as jest.MockedFunction<typeof useGetUnitsQuery>;

const UNITS: UnitType[] = [
    {
        id: 1,
        abbreviation: 'tbsp',
        name: 'tablespoon'
    },
];

const INGREDIENT: IngredientType =
    {
        id: 1,
        description: 'IngredientDesc',
        ordering: 1,
        quantity: 0
    };

describe('Ingredient component', () => {

    beforeEach(() => {
        mockGetUnitsQuery.mockReturnValue({
            data: UNITS,
            refetch: jest.fn()
        });
    });

    test('renders "IngredientDesc" when no Unit and no Qty', () => {
        // Arrange
        renderWithProviders(<Ingredient ingredient={INGREDIENT}/>);

        // Act
        // ... nothing

        // Assert
        expect(screen.getByText('IngredientDesc', {exact: true})).toBeInTheDocument();
        expect(screen.queryByText(/\s+IngredientDesc\s+/, {})).not.toBeInTheDocument();
    });

    test('renders "1 IngredientDesc" when Qty and no Unit', () => {
        // Arrange
        INGREDIENT.quantity = 1;
        renderWithProviders(<Ingredient ingredient={INGREDIENT}/>);

        // Act
        // ... nothing

        // Assert
        expect(screen.getByText('1 IngredientDesc', {exact: true})).toBeInTheDocument();
        expect(screen.queryByText(/\s+1 IngredientDesc\s+/, {})).not.toBeInTheDocument();
    });
    test('renders "1 tablespoon of IngredientDesc" when Qty and Unit', () => {
        // Arrange
        INGREDIENT.quantity = 1;
        INGREDIENT.unit = UNITS[0];

        renderWithProviders(<Ingredient ingredient={INGREDIENT}/>);

        // Act
        // ... nothing

        // Assert
        expect(screen.getByText('1 tablespoon of IngredientDesc', {exact: true})).toBeInTheDocument();
        expect(screen.queryByText(/\s+1 tablespoon of IngredientDesc\s+/, {})).not.toBeInTheDocument();
    });
    test('renders "0.5" as  "1/2"', () => {
        // Arrange
        INGREDIENT.quantity = 0.5;
        INGREDIENT.unit = UNITS[0];

        renderWithProviders(<Ingredient ingredient={INGREDIENT}/>);

        // Act
        // ... nothing

        // Assert
        expect(screen.getByText('1/2 tablespoon of IngredientDesc', {exact: true})).toBeInTheDocument();
    });
    test('renders "0.25" as  "1/4"', () => {
        // Arrange
        INGREDIENT.quantity = 0.25;
        INGREDIENT.unit = UNITS[0];

        renderWithProviders(<Ingredient ingredient={INGREDIENT}/>);

        // Act
        // ... nothing

        // Assert
        expect(screen.getByText('1/4 tablespoon of IngredientDesc', {exact: true})).toBeInTheDocument();
    });
    test('renders "0.75" as  "3/4"', () => {
        // Arrange
        INGREDIENT.quantity = 0.75;
        INGREDIENT.unit = UNITS[0];

        renderWithProviders(<Ingredient ingredient={INGREDIENT}/>);

        // Act
        // ... nothing

        // Assert
        expect(screen.getByText('3/4 tablespoon of IngredientDesc', {exact: true})).toBeInTheDocument();
    });
    test('renders "2 tablespoons of IngredientDesc" when Qty and Unit', () => {
        // Arrange
        INGREDIENT.quantity = 2;
        INGREDIENT.unit = UNITS[0];

        renderWithProviders(<Ingredient ingredient={INGREDIENT}/>);

        // Act
        // ... nothing

        // Assert
        expect(screen.getByText('2 tablespoons of IngredientDesc', {exact: true})).toBeInTheDocument();
    });
    test('renders "2 1/2 tablespoons of IngredientDesc" when Qty and Unit', () => {
        // Arrange
        INGREDIENT.quantity = 2.5;
        INGREDIENT.unit = UNITS[0];

        renderWithProviders(<Ingredient ingredient={INGREDIENT}/>);

        // Act
        // ... nothing

        // Assert
        expect(screen.getByText('2 1/2 tablespoons of IngredientDesc', {exact: true})).toBeInTheDocument();
    });
});