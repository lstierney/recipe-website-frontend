import Home from "./Home";
import {screen} from "@testing-library/react";
import {renderWithProviders} from "../../utils/test-utils";
import {useGetLatestRecipesQuery, useGetRandomRecipesQuery} from "../../store/api";

jest.mock('../../store/api');

const LATEST_RECIPE = {
    id: 1,
    name: 'Latest Recipe Name',
    description: 'Latest Recipe Description'
};
const RANDOM_RECIPE = {
    id: 2,
    name: 'Random Recipe Name',
    description: 'Random Recipe Description'
};

describe('Home page', () => {
    beforeEach(() => {
        useGetLatestRecipesQuery.mockReturnValue({
            data: LATEST_RECIPE,
        });
        useGetRandomRecipesQuery.mockReturnValue({
            data: RANDOM_RECIPE,
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
        expect(screen.getByText("Latest Recipe Name", {exact: true})).toBeInTheDocument();
        expect(screen.getByText("Latest Recipe Description", {exact: true})).toBeInTheDocument();
    });
    test('renders Random recipe', () => {
        // Arrange
        renderWithProviders(<Home/>);

        // Act
        // ...nothing

        // Assert
        expect(screen.getByText("Random Recipe Name", {exact: true})).toBeInTheDocument();
        expect(screen.getByText("Random Recipe Description", {exact: true})).toBeInTheDocument();
    });
});