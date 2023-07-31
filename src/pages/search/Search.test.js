import {screen} from "@testing-library/react";
import Search from "./Search";
import {renderWithProviders} from "../../utils/test-utils";
import userEvent from "@testing-library/user-event";
import {act} from "react-dom/test-utils";
import {useGetRecipesByTagQuery, useGetTagsQuery} from "../../store/api";

const TAGS = [
    {id: 1, name: 'Tag-One'},
    {id: 2, name: 'Tag-Two'}
];

const prepareGetTagsMock = (tags = []) => {
    useGetTagsQuery.mockReturnValue({
        data: tags
    });
}

const prepareGetRecipesByTagMock = (tags = []) => {
    useGetRecipesByTagQuery.mockReturnValue({
        data: tags
    });
}

jest.mock('../../store/api');

describe('Search page', () => {
    test('renders the Tags as buttons', () => {
        // Arrange
        prepareGetTagsMock(TAGS);
        prepareGetRecipesByTagMock();
        renderWithProviders(<Search/>);

        // Act
        // ...nothing

        // Assert
        const tagButtons = screen.getAllByRole('button');
        expect(tagButtons).toHaveLength(2);
    });
    test('displays message when no Tags found', () => {
        // Arrange
        prepareGetTagsMock();
        prepareGetRecipesByTagMock();
        renderWithProviders(<Search/>);

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
        prepareGetTagsMock(TAGS);
        prepareGetRecipesByTagMock();
        renderWithProviders(<Search/>, [{
            path: '/search',
            element: <Search/>
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
});