import TagsList from "./TagsList";
import {render, screen} from "@testing-library/react";

const TAGS = [
    {
        id: 1,
        name: 'tag-one'
    },
    {
        id: 2,
        name: 'tag-two'
    }
];

describe('TagList', () => {
    test('renders "No tags available" when no tags', () => {
        // Arrange
        render(<TagsList/>);

        // Act
        // -- nothing

        // Assert
        const message = screen.getByText('No tags available', {exact: true});
        expect(message).toBeInTheDocument();
    });
    test('renders tags as buttons', () => {
        // Arrange
        render(<TagsList tags={TAGS}/>);

        // Act
        // -- nothing

        // Assert
        const buttons = screen.getAllByRole('button', {});
        expect(buttons).toHaveLength(2);

        let button = screen.getByLabelText('tag-one button', {exact: true});
        expect(button).toBeInTheDocument();
        button = screen.getByLabelText('tag-two button', {exact: true});
        expect(button).toBeInTheDocument();
    });
});