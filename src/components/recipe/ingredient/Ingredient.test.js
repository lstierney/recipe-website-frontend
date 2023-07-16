import {useGetUnitsQuery} from "../../../store/api";
import {renderWithProviders} from "../../../utils/test-utils";
import {screen} from "@testing-library/react";
import Ingredient from "./Ingredient";

jest.mock('../../../store/api');

const UNITS = [
    {
        id: 1,
        abbreviation: 'tbsp',
        name: 'tablespoon'
    },
];

const INGREDIENT =
    {
        id: 1,
        description: 'IngredientDesc',
        ordering: 1
    };

describe('Ingredient component', () => {

    beforeEach(() => {
        useGetUnitsQuery.mockReturnValue({
            data: UNITS
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