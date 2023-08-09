import {screen} from "@testing-library/react";
import Recipes from "./Recipes";
import {renderWithProviders} from "../../utils/test-utils";
import userEvent from "@testing-library/user-event";
import {act} from "react-dom/test-utils";
import {useGetRecipesByTagQuery, useGetRecipeTitlesAndIdsQuery, useGetTagsQuery} from "../../store/api";

const TAGS = [
    {id: 1, name: 'Tag-One'},
    {id: 2, name: 'Tag-Two'}
];

const ALL_RECIPES = [
    {
        id: 1,
        name: 'Recipe One',
        description: 'Recipe One Description',
        imageFileName: 'recipe1.jpg'
    },
    {
        id: 2,
        name: 'Recipe Two',
        description: 'Recipe Two Description',
        imageFileName: 'recipe2.jpg'
    }
];
const RECIPES_FOR_TAG = [
    {
        id: 3,
        name: 'Recipe Three',
        description: 'Recipe Three Description',
        imageFileName: 'recipe3.jpg'
    },
    {
        id: 4,
        name: 'Recipe Four',
        description: 'Recipe Four Description',
        imageFileName: 'recipe4.jpg'
    }
];

const prepareGetTagsMock = (tags = []) => {
    useGetTagsQuery.mockReturnValue({
        data: tags
    });
}

const prepareGetRecipeTitlesAndIdsQueryMock = (recipes = []) => {
    useGetRecipeTitlesAndIdsQuery.mockReturnValue({
        data: recipes
    });
}

const prepareGetRecipesByTagMock = (recipes = []) => {
    useGetRecipesByTagQuery.mockReturnValue({
        data: recipes
    });
}

jest.mock('../../store/api');

function assertInitialRecipePreviewsHaveRendered() {
    let name = screen.getByText('Recipe One', {exact: true});
    expect(name).toBeInTheDocument();

    name = screen.getByText('Recipe Two', {exact: true});
    expect(name).toBeInTheDocument();

    let image = screen.getByAltText('Recipe One', {exact: true});
    expect(image).toBeInTheDocument();

    image = screen.getByAltText('Recipe Two', {exact: true});
    expect(image).toBeInTheDocument();
}

describe('Search page', () => {
    beforeEach(() => {
        prepareGetRecipeTitlesAndIdsQueryMock(ALL_RECIPES);
        prepareGetTagsMock(TAGS);
        prepareGetRecipesByTagMock(RECIPES_FOR_TAG);
    });

    test('renders the Tags as buttons', () => {
        // Arrange
        renderWithProviders(<Recipes/>);

        // Act
        // ...nothing

        // Assert
        const tagButtons = screen.getAllByRole('button');
        expect(tagButtons).toHaveLength(2);
    });
    test('renders list of Recipe previews when page initially loads', () => {
        // Arrange
        renderWithProviders(<Recipes/>, [{
            path: '/recipes',
            element: <Recipes/>
        }]);

        // Act
        // -- nothing

        // Assert
        assertInitialRecipePreviewsHaveRendered();
    });
    test('displays message when no Tags found', () => {
        // Arrange
        prepareGetTagsMock();
        renderWithProviders(<Recipes/>);

        // Act
        // ...nothing

        // Assert
        const tagButtons = screen.queryAllByRole('button');
        expect(tagButtons).toHaveLength(0);

        const message = screen.getByText('No tags found', {exact: true});
        expect(message).toBeInTheDocument();
    });
    test('displays a message when no Recipes are found for a Tag', () => {
        // Arrange
        prepareGetRecipesByTagMock();
        renderWithProviders(<Recipes/>, [{
            path: '/recipes',
            element: <Recipes/>
        }]);

        // Act
        const button = screen.getByText('Tag-One');

        act(() => {
            userEvent.click(button);
        });

        // Assert
        let message = screen.getByText('Recipes for Tag "Tag-One"', {exact: true});
        expect(message).toBeInTheDocument();

        message = screen.getByText('No recipes found', {exact: true});
        expect(message).toBeInTheDocument();
    });
    test('renders list of Recipe previews when recipes are found for a Tag', () => {
        // Arrange
        renderWithProviders(<Recipes/>, [{
            path: '/recipes',
            element: <Recipes/>
        }]);

        // Act
        const button = screen.getByText('Tag-One');

        act(() => {
            userEvent.click(button);
        });

        // Assert
        let message = screen.getByText('Recipes for Tag "Tag-One"', {exact: true});
        expect(message).toBeInTheDocument();

        message = screen.queryByText('No recipes found', {exact: true});
        expect(message).not.toBeInTheDocument();

        let name = screen.getByText('Recipe Three', {exact: true});
        expect(name).toBeInTheDocument();

        name = screen.getByText('Recipe Four', {exact: true});
        expect(name).toBeInTheDocument();

        let image = screen.getByAltText('Recipe Three', {exact: true});
        expect(image).toBeInTheDocument();

        image = screen.getByAltText('Recipe Four', {exact: true});
        expect(image).toBeInTheDocument();
    });
    test('renders close/clear filters icon beside message after clicking Tag', () => {
        // Prepare
        renderWithProviders(<Recipes/>, [{
            path: '/recipes',
            element: <Recipes/>
        }]);

        // Act
        const button = screen.getByText('Tag-One');

        act(() => {
            userEvent.click(button);
        });

        // Assert
        const clearFilter = screen.getByLabelText('Clear Filter', {exact: true});
        expect(clearFilter).toBeInTheDocument();
    });
    test('renders initial list of Recipe previews when close/clear filters icon is clicked', () => {
        // Prepare
        renderWithProviders(<Recipes/>, [{
            path: '/recipes',
            element: <Recipes/>
        }]);

        // Act
        // Perform the search by tag
        const button = screen.getByText('Tag-One');

        act(() => {
            userEvent.click(button);
        });

        // and then click the clear filter icon
        const icon = screen.getByLabelText('Clear Filter', {exact: true});
        act(() => {
            userEvent.click(icon);
        });

        // Assert
        assertInitialRecipePreviewsHaveRendered();
    });
});