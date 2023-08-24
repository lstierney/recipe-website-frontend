import {renderWithProviders} from "../../../utils/test-utils";
import {screen} from "@testing-library/react";
import Note from "./Note";
import {NoteType} from "../../../types/noteType";

const NOTE: NoteType =
    {
        id: 1,
        description: 'Note Desc',
        ordering: 1
    };

describe('Note component', () => {


    test('renders "Note" Desc"', () => {
        // Arrange
        renderWithProviders(<Note note={NOTE}/>);

        // Act
        // ... nothing

        // Assert
        expect(screen.getByText('Note Desc', {exact: true})).toBeInTheDocument();
        expect(screen.queryByText(/\s+Note Desc\s+/, {})).not.toBeInTheDocument();
    });
});