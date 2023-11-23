import {render, screen} from "@testing-library/react";
import Method from "./Method";
import {isInEditingMode} from "../../../utils/auth";
import {MethodStepType} from "../../../types/methodStepType";

jest.mock('../../../utils/auth');

const mockIsInEditingMode = isInEditingMode as jest.MockedFunction<typeof isInEditingMode>;

describe('Method component', () => {
    test('renders title', () => {
        // Arrange
        render(<Method items={[]} onUpdate={jest.fn()} onRemove={jest.fn()} onAdd={jest.fn()} onReorder={jest.fn()}/>);

        // Act
        // -- nothing

        // Assert
        const title = screen.getByText('Method', {exact: true});
        expect(title).toBeInTheDocument();
    });
    test('renders "None found" when no items are supplied', () => {
        // Arrange
        render(<Method items={[]} onUpdate={jest.fn()} onRemove={jest.fn()} onAdd={jest.fn()} onReorder={jest.fn()}/>);

        // Act
        // -- nothing

        // Assert
        const noneFound = screen.getByText('None found', {exact: true});
        expect(noneFound).toBeInTheDocument();
    });
    test('renders draggablelist when items supplied', () => {
        // Arrange
        const items: MethodStepType[] = [
            {
                id: 1,
                description: 'description 1',
                number: 1
            },
            {
                id: 2,
                description: 'description 2',
                number: 2
            }
        ];
        render(<Method items={items} onRemove={jest.fn()} onUpdate={jest.fn()} onAdd={jest.fn()}
                       onReorder={jest.fn()}/>);

        // Act
        // -- nothing

        // Assert
        expect(screen.getByText('description 1', {exact: true})).toBeInTheDocument();
        expect(screen.getByText('description 2', {exact: true})).toBeInTheDocument();
    });
    test('renders input component when in edit mode', () => {
        // Arrange
        mockIsInEditingMode.mockReturnValue(true);
        render(<Method items={[]} onRemove={jest.fn()} onUpdate={jest.fn()} onAdd={jest.fn()} onReorder={jest.fn()}/>);

        // Act
        // -- nothing

        // Assert
        const addButton = screen.getByRole('button', {name: 'Add'})
        expect(addButton).toBeInTheDocument();

        const textArea = screen.getByRole('textbox', {})
        expect(textArea).toBeInTheDocument();
    });
});