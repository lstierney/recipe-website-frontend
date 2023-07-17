import Home from "./Home";
import {screen} from "@testing-library/react";
import {renderWithProviders} from "../../utils/test-utils";
import {useGetLatestRecipesQuery} from "../../store/api";

jest.mock('../../store/api');

const RECIPE = {
    id: 1,
    name: 'Test Recipe',
};

describe('Home page', () => {
    beforeEach(() => {
        useGetLatestRecipesQuery.mockReturnValue({
            data: RECIPE,
        });
    });

    test('renders main title (using config)', () => {
        // Arrange
        renderWithProviders(<Home/>);

        // Act
        // ...nothing

        // Assert
        const mainTitle = screen.getByText("My Veggie Recipes", {exact: true});
        expect(mainTitle).toBeInTheDocument();
    });
    test('renders Latest recipe', () => {
        // Arrange
        renderWithProviders(<Home/>);

        // Act
        // ...nothing

        // Assert
        const latestRecipe = screen.getByText("Test Recipe", {exact: true});
        expect(latestRecipe).toBeInTheDocument();
    });
});