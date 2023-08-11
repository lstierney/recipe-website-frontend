import {render, screen} from "@testing-library/react";
import Notes from "./Notes";
import {isInEditingMode} from "../../../utils/auth";

jest.mock('../../../utils/auth');

describe('Notes component', () => {
    test('renders title', () => {
        // Arrange
        render(<Notes/>);

        // Act
        // -- nothing

        // Assert
        const notes = screen.getByText('Notes', {exact: true});
        expect(notes).toBeInTheDocument();
    });
    test('renders "None found" when no notes are supplied', () => {
        // Arrange
        render(<Notes/>);

        // Act
        // -- nothing

        // Assert
        const noneFound = screen.getByText('None found', {exact: true});
        expect(noneFound).toBeInTheDocument();
    });
    test('renders draggablelist', () => {
        // Arrange
        const notes = [
            {
                id: 1,
                description: 'description 1'
            },
            {
                id: 2,
                description: 'description 2'
            }
        ];
        render(<Notes notes={notes}/>);

        // Act
        // -- nothing

        // Assert
        expect(screen.getByText('description 1', {exact: true})).toBeInTheDocument();
        expect(screen.getByText('description 2', {exact: true})).toBeInTheDocument();
    });
    test('renders input component when in edit mode', () => {
        // Arrange
        isInEditingMode.mockReturnValue(true);
        render(<Notes/>);

        // Act
        // -- nothing

        // Assert
        const addButton = screen.getByRole('button', {name: 'Add'})
        expect(addButton).toBeInTheDocument();

        const textArea = screen.getByRole('textbox', {})
        expect(textArea).toBeInTheDocument();
    });
});