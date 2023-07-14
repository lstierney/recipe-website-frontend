import Home from "./Home";
import {screen} from "@testing-library/react";
import {renderWithProviders} from "../utils/test-utils";
import {useGetLatestRecipesQuery} from "../store/api";

jest.mock('../store/api');

describe('Home page', () => {
    test('renders main title (using config)', () => {
        // Arrange
        const recipeData = {
            id: 1,
            name: 'Test Recipe',
        };
        useGetLatestRecipesQuery.mockReturnValueOnce({
            data: recipeData,
        });
        renderWithProviders(<Home/>);

        // Act
        // ...nothing

        // Assert
        const mainTitle = screen.getByText("My Veggie Recipes", {exact: true});
        expect(mainTitle).toBeInTheDocument();
    });
});