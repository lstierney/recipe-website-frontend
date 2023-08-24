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
    test('renders "1 tablespoon IngredientDesc" when Qty and Unit', () => {
        // Arrange
        INGREDIENT.quantity = 1;
        INGREDIENT.unit = UNITS[0];

        renderWithProviders(<Ingredient ingredient={INGREDIENT}/>);

        // Act
        // ... nothing

        // Assert
        expect(screen.getByText('1 tablespoon IngredientDesc', {exact: true})).toBeInTheDocument();
        expect(screen.queryByText(/\s+1 tablespoon IngredientDesc\s+/, {})).not.toBeInTheDocument();
    });
});