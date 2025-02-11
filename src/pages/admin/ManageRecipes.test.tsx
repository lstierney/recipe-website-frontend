import {renderWithProviders} from "../../utils/test-utils";
import ManageRecipes from "./ManageRecipes";
import {screen} from "@testing-library/react";
import React from "react";
import {
    useGetRecipesIgnoreDeletedQuery,
    useMarkRecipeAsDeletedMutation,
    useRestoreRecipeMutation
} from "../../store/api";
import {RecipeType} from "../../types/recipeType";

jest.mock('../../store/api');

const mockGetRecipesIgnoringDeleted = useGetRecipesIgnoreDeletedQuery as jest.MockedFunction<typeof useGetRecipesIgnoreDeletedQuery>;
const mockMarkRecipeAsDeletedMutation = useMarkRecipeAsDeletedMutation as jest.MockedFunction<typeof useMarkRecipeAsDeletedMutation>;
const mockRestoreRecipeMutation = useRestoreRecipeMutation as jest.MockedFunction<typeof useRestoreRecipeMutation>;

const RECIPES: RecipeType[] = [
    {
        id: 1,
        name: 'Recipe One',
        cookingTime: 30,
        description: 'Recipe One Desc',
        cooked: 1,
        deleted: 0,
        imageFileNames: ['image1.jpg'],
        imageFolderPath: '/opt/recipe-website/images/1 - Recipe One/'
    },
    {
        id: 2,
        name: 'Recipe Two',
        cookingTime: 30,
        description: 'Recipe Two Desc',
        cooked: 1,
        deleted: 0,
        imageFileNames: ['image2.jpg'],
        imageFolderPath: '/opt/recipe-website/images/2 - Recipe Two/'
    }
];

const prepareGetRecipesIgnoringDeletedMock = (recipes: RecipeType[]) => {
    mockGetRecipesIgnoringDeleted.mockReturnValue({
        data: recipes,
        refetch: jest.fn()
    });
    mockMarkRecipeAsDeletedMutation.mockReturnValue([
        jest.fn(), // Mutation trigger function.
        {
            isLoading: false,
            isError: false,
            isSuccess: true,
            data: null,
            error: null,
            reset: jest.fn()
        }
    ]);
    mockRestoreRecipeMutation.mockReturnValue([
        jest.fn(), // Mutation trigger function.
        {
            isLoading: false,
            isError: false,
            isSuccess: true,
            data: null,
            error: null,
            reset: jest.fn()
        }
    ]);
}

describe('Manage Recipes Page', () => {
    beforeEach(() => {
        prepareGetRecipesIgnoringDeletedMock(RECIPES);
    });

    afterEach(() => {
        //jest.resetAllMocks();
    });

    test('renders list of Recipes when Recipes are found', async () => {
        // Arrange
        renderWithProviders(<ManageRecipes/>);

        // Assert
        expect(screen.getByRole('heading', {name: /Recipes/i})).toBeInTheDocument();

        // Check the list
        const firstRecipe = screen.getByText('Recipe One');
        expect(firstRecipe).toBeInTheDocument();
        // expect(firstRecipe).toHaveAttribute('title', 'Idea 1 Name');
        // expect(firstRecipe).toHaveAttribute('href', 'Idea 1 Url');

        const secondRecipe = screen.getByText('Recipe Two');
        expect(secondRecipe).toBeInTheDocument();
        //expect(secondRecipe).toHaveAttribute('title', 'Idea 2 Name');
        // expect(secondRecipe).toHaveAttribute('href', 'Idea 2 Url');
    });
});