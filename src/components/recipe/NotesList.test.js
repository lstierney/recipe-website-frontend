import {renderWithProviders} from "../../utils/test-utils";
import {screen} from "@testing-library/react";
import NotesList from "./NotesList";

const NOTES = [
    {
        id: 1,
        ordering: 1,
        description: 'This is Note 1'
    },
    {
        id: 2,
        ordering: 2,
        description: 'This is Note 2'
    }
];

describe('NotesList component', () => {
    test('renders list of Notes', () => {
        // Arrange
        renderWithProviders(<NotesList notes={NOTES}/>);

        // Act
        // ... nothing

        // Assert
        expect(screen.getAllByRole('listitem')).toHaveLength(2);
        expect(screen.getByText('This is Note 1')).toBeInTheDocument();
        expect(screen.getByText('This is Note 2')).toBeInTheDocument();
    });
    test('does not display "No Notes found" when Notes are supplied', () => {
        // Arrange
        renderWithProviders(<NotesList notes={NOTES}/>);

        // Act
        // ... nothing

        // Assert
        const message = screen.queryByText('No Notes found', {exact: false});
        expect(message).not.toBeInTheDocument();
    });
    test('displays "No Notes found" when no Notes are supplied', () => {
        // Arrange
        renderWithProviders(<NotesList notes={[]}/>);

        // Act
        // ... nothing

        // Assert
        const message = screen.getByText('No Notes found', {exact: true});
        expect(message).toBeInTheDocument();
    });
    test('does not render any Notes when none are supplied', () => {
        // Arrange
        renderWithProviders(<NotesList notes={[]}/>);

        // Act
        // ... nothing

        // Assert
        expect(screen.queryAllByRole('listitem')).toHaveLength(0);
    });
});