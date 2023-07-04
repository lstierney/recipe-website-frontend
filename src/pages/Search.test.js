import {screen} from "@testing-library/react";
import Search from "./Search";
import {renderWithProviders} from "../utils/test-utils";
import userEvent from "@testing-library/user-event";
import {act} from "react-dom/test-utils";

const preloadedState = {
    preloadedState: {
        meta: {
            tags: [
                {id: 1, name: 'Tag Number One'},
                {id: 2, name: 'Tag Number Two'}
            ]
        }
    }
}

describe('Search page', () => {
    test('renders the Tags from Redux as buttons', () => {

        // Arrange
        renderWithProviders(<Search/>, preloadedState);

        // Act
        // ...nothing

        // Assert
        const tagButtons = screen.getAllByRole('button');
        expect(tagButtons).toHaveLength(2);
    });
    test('displays message when no Tags found', () => {

        // Arrange
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
        renderWithProviders(<Search/>, preloadedState);

        // Act
        const button = screen.getByText('Tag Number One');

        act(() => {
            userEvent.click(button);
        });


        // Assert
        let message = screen.getByText('Recipes for Tag "Tag Number One"', {exact: true});
        expect(message).toBeInTheDocument();

        message = screen.getByText('No recipes found', {exact: true});
        expect(message).toBeInTheDocument();
    });
});