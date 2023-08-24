import {render, screen} from "@testing-library/react";
import Notes from "./Notes";
import {isInEditingMode} from "../../../utils/auth";
import {NoteType} from "../../../types/noteType";

jest.mock('../../../utils/auth');

const mockIsInEditingMode = isInEditingMode as jest.MockedFunction<typeof isInEditingMode>;

describe('Notes component', () => {
    test('renders title', () => {
        // Arrange
        render(<Notes notes={[]} onRemove={jest.fn()} onAdd={jest.fn()} onReorder={jest.fn}/>);

        // Act
        // -- nothing

        // Assert
        const notes = screen.getByText('Notes', {exact: true});
        expect(notes).toBeInTheDocument();
    });
    test('renders "None found" when no notes are supplied', () => {
        // Arrange
        render(<Notes notes={[]} onRemove={jest.fn()} onAdd={jest.fn()} onReorder={jest.fn}/>);

        // Act
        // -- nothing

        // Assert
        const noneFound = screen.getByText('None found', {exact: true});
        expect(noneFound).toBeInTheDocument();
    });
    test('renders draggablelist', () => {
        // Arrange
        const notes: NoteType[] = [
            {
                id: 1,
                description: 'description 1',
                ordering: 1
            },
            {
                id: 2,
                description: 'description 2',
                ordering: 2
            }
        ];
        render(<Notes notes={notes} onRemove={jest.fn()} onAdd={jest.fn()} onReorder={jest.fn}/>);

        // Act
        // -- nothing

        // Assert
        expect(screen.getByText('description 1', {exact: true})).toBeInTheDocument();
        expect(screen.getByText('description 2', {exact: true})).toBeInTheDocument();
    });
    test('renders input component when in edit mode', () => {
        // Arrange
        mockIsInEditingMode.mockReturnValue(true);
        render(<Notes notes={[]} onRemove={jest.fn()} onAdd={jest.fn()} onReorder={jest.fn}/>);

        // Act
        // -- nothing

        // Assert
        const addButton = screen.getByRole('button', {name: 'Add'})
        expect(addButton).toBeInTheDocument();

        const textArea = screen.getByRole('textbox', {})
        expect(textArea).toBeInTheDocument();
    });
});