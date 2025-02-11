import {renderWithProviders} from "../../utils/test-utils";
import {fireEvent, screen} from "@testing-library/react";
import {useGetRandomDinnerQuery} from "../../store/api";
import {RecipePreviewType} from "../../types/recipePreviewType";
import Hero from "./Hero";

jest.mock('../../store/api');

const mockGetRandomDinnerQuery = useGetRandomDinnerQuery as jest.MockedFunction<typeof useGetRandomDinnerQuery>;

const RANDOM_DINNER: RecipePreviewType = {
    id: 2,
    name: 'Recipe Name',
    description: 'Recipe Description',
    cooked: 420,
    imageFileNames: ['image1.jpg'],
    imageFolderPath: '/opt/recipe-website/images/2 - Recipe Name/'
};

const renderHero = () => {
    return renderWithProviders(<Hero/>);
}

// Mock react-router-dom
jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom');
    return {
        ...originalModule,
        useNavigate: jest.fn(),
    };
});

describe('Hero component page', () => {
    beforeEach(() => {
        mockGetRandomDinnerQuery.mockReturnValue({
            data: RANDOM_DINNER,
            isSuccess: true,
            refetch: jest.fn()
        });
    });

    test('renders Recipe name', () => {
        // Arrange
        renderHero();

        // Act
        // ...nothing

        // Assert
        expect(screen.getByText("Recipe Name", {exact: true})).toBeInTheDocument();
    });
    test('renders Recipe description', () => {
        // Arrange
        renderHero();

        // Act
        // ...nothing

        // Assert
        expect(screen.getByText("Recipe Description", {exact: true})).toBeInTheDocument();
    });
    test('renders Image', () => {
        // Arrange
        renderHero();

        // Act
        // ...nothing

        // Assert
        const image = screen.getByRole('img', {});
        expect(image).toHaveAttribute('alt', 'Recipe Name');
        expect(image).toHaveAttribute('src', 'http://localhost:8080/opt/recipe-website/images/2 - Recipe Name/image1.jpg');
    });

    test('handleImageClick is invoked on div click', async () => {
        // Arrange
        const mockNavigate = jest.fn();
        require('react-router-dom').useNavigate.mockReturnValue(mockNavigate);

        renderHero();

        // Act
        const divElement = screen.getByTestId('hero-container');
        fireEvent.click(divElement);

        expect(mockNavigate).toHaveBeenCalled();
    });

});