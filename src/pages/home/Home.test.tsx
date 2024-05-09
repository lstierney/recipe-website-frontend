import Home from "./Home";
import {screen} from "@testing-library/react";
import {renderWithProviders} from "../../utils/test-utils";
import {useGetRandomDinnerQuery, useGetRandomDinnersQuery} from "../../store/api";

jest.mock('../../store/api');

const mockGetRandomDinnersQuery = useGetRandomDinnersQuery as jest.MockedFunction<typeof useGetRandomDinnersQuery>;
const mockGetRandomDinnerQuery = useGetRandomDinnerQuery as jest.MockedFunction<typeof useGetRandomDinnerQuery>;

const RANDOM_DINNERS = [
    {
        id: 1,
        name: 'Random Dinner One'

    },
    {
        id: 2,
        name: 'Random Dinner Two'
    }
];
const RANDOM_DINNER = {
    id: 3,
    name: 'Random Dinner Three'

}

describe('Home page', () => {
    beforeEach(() => {
        mockGetRandomDinnersQuery.mockReturnValue({
            data: RANDOM_DINNERS,
            refetch: jest.fn(),
            isSuccess: true
        });
        mockGetRandomDinnerQuery.mockReturnValue({
            data: RANDOM_DINNER,
            refetch: jest.fn(),
            isSuccess: true
        });
    });

    test('renders random dinner Recipes', () => {
        // Arrange
        renderWithProviders(<Home/>);

        // Act
        // ...nothing

        // Assert
        // The image previews on the RHS
        expect(screen.getByText("Random Dinner One", {exact: true})).toBeInTheDocument();
        expect(screen.getByText("Random Dinner Two", {exact: true})).toBeInTheDocument();

        // The hero
        expect(screen.getByText("Random Dinner Three", {exact: true})).toBeInTheDocument();
    });
});