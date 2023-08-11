import {render, screen} from "@testing-library/react";
import Method from "./Method";
import {isInEditingMode} from "../../../utils/auth";
import {renderWithProviders} from "../../../utils/test-utils";

jest.mock('../../../utils/auth');

describe('Method component', () => {
    test('renders title', () => {
        // Arrange
        render(<Method/>);

        // Act
        // -- nothing

        // Assert
        const title = screen.getByText('Method', {exact: true});
        expect(title).toBeInTheDocument();
    });
    test('renders "None found" when no items are supplied', () => {
        // Arrange
        render(<Method/>);

        // Act
        // -- nothing

        // Assert
        const noneFound = screen.getByText('None found', {exact: true});
        expect(noneFound).toBeInTheDocument();
    });
    test('renders draggablelist when items supplied', () => {
        // Arrange
        const items = [
            {
                id: 1,
                description: 'description 1'
            },
            {
                id: 2,
                description: 'description 2'
            }
        ];
        renderWithProviders(<Method items={items}/>);

        // Act
        // -- nothing

        // Assert
        expect(screen.getByText('description 1', {exact: true})).toBeInTheDocument();
        expect(screen.getByText('description 2', {exact: true})).toBeInTheDocument();
    });
    test('renders input component when in edit mode', () => {
        // Arrange
        isInEditingMode.mockReturnValue(true);
        render(<Method/>);

        // Act
        // -- nothing

        // Assert
        const addButton = screen.getByRole('button', {name: 'Add'})
        expect(addButton).toBeInTheDocument();

        const textArea = screen.getByRole('textbox', {})
        expect(textArea).toBeInTheDocument();
    });
});