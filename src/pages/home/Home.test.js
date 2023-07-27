import Home from "./Home";
import {screen} from "@testing-library/react";
import {renderWithProviders} from "../../utils/test-utils";
import {useGetLatestRecipesQuery, useGetRecipeTitlesAndIdsQuery} from "../../store/api";

jest.mock('../../store/api');

const LATEST_RECIPES = [
    {
        id: 1,
        name: 'Latest Recipe One'

    },
    {
        id: 2,
        name: 'Latest Recipe Two'
    }
];

const RECIPES_LIST = [{
    id: 2,
    name: 'Recipe List Name',
    description: 'Recipe List Description',
    imageFileName: 'recipe2.jpg'
}];

describe('Home page', () => {
    beforeEach(() => {
        useGetLatestRecipesQuery.mockReturnValue({
            data: LATEST_RECIPES,
        });
        useGetRecipeTitlesAndIdsQuery.mockReturnValue({
            data: RECIPES_LIST,
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
        expect(screen.getByText("Latest Recipe One", {exact: true})).toBeInTheDocument();
        expect(screen.getByText("Latest Recipe Two", {exact: true})).toBeInTheDocument();
    });
});