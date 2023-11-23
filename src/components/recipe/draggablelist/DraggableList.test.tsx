import {renderWithProviders} from "../../../utils/test-utils";
import {screen} from "@testing-library/react";
import DraggableList from './DraggableList';
import {useGetUnitsQuery} from "../../../store/api";
import {OrderableType} from "../../../types/orderableType";
import {act} from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

jest.mock('../../../store/api');

const mockGetUnitsQuery = useGetUnitsQuery as jest.MockedFunction<typeof useGetUnitsQuery>;

const ITEMS = [
    {
        id: 1,
        ordering: 1,
        description: 'Description One'
    },
    {
        id: 2,
        ordering: 2,
        description: 'Description Two'
    }
];

const renderDraggableList = (items: OrderableType[] = ITEMS, type: string = 'notes') => {
    renderWithProviders(<DraggableList items={items} type={type} onRemove={jest.fn()} onIngredientUpdate={jest.fn()}
                                       onUpdate={jest.fn()} onReorder={jest.fn()}/>);
}

const enterEditMode = () => {
    localStorage.setItem('isEditing', 'true');
    localStorage.setItem('token', 'fake token');
    localStorage.setItem('expiration', '' + (new Date().getTime() + 1000));
}

const shouldRenderButtons = (listItemType: string, buttonName: string) => {
    // Arrange
    enterEditMode();
    renderDraggableList(undefined, listItemType);

    // Act
    // ... nothing

    // Assert
    expect(screen.queryAllByRole('button', {name: buttonName})).toHaveLength(2);
}

describe('DraggableList component', () => {

    beforeEach(() => {
        mockGetUnitsQuery.mockReturnValue({
            data: [],
            refetch: jest.fn()
        });
    });

    test('renders list of Items', () => {
        // Arrange
        renderDraggableList();

        // Act
        // ... nothing

        // Assert
        expect(screen.getAllByRole('separator')).toHaveLength(2);
        expect(screen.getByText('Description One')).toBeInTheDocument();
        expect(screen.getByText('Description Two')).toBeInTheDocument();
    });
    test('does not display "None found" when Items are supplied', () => {
        // Arrange
        renderDraggableList();

        // Act
        // ... nothing

        // Assert
        const message = screen.queryByText('None found', {exact: false});
        expect(message).not.toBeInTheDocument();
    });
    test('displays "None Found" when no Items are supplied', () => {
        // Arrange
        renderDraggableList([]);

        // Act
        // ... nothing

        // Assert
        const message = screen.getByText('None found', {exact: true});
        expect(message).toBeInTheDocument();
    });
    test('does not render any Items when none are supplied', () => {
        // Arrange
        renderDraggableList([]);

        // Act
        // ... nothing

        // Assert
        expect(screen.queryAllByRole('listitem')).toHaveLength(0);
    });
    test('renders "STEP X" when Items are of type "methodSteps"', () => {
        // Arrange
        renderDraggableList(undefined, 'methodSteps');

        // Act
        // ... nothing

        // Assert
        expect(screen.getByText('STEP 1', {})).toBeInTheDocument();
        expect(screen.getByText('STEP 2', {})).toBeInTheDocument();
    });
    test('does not render "STEP X" when Items are not of type "methodSteps"', () => {
        // Arrange
        renderDraggableList(ITEMS, 'ingredients');

        // Act
        // ... nothing

        // Assert
        expect(screen.queryByText('STEP 1', {})).not.toBeInTheDocument();
        expect(screen.queryByText('STEP 2', {})).not.toBeInTheDocument();
    });
    test('should render "Remove" buttons when in edit mode [methodSteps]', () => {
        shouldRenderButtons('methodSteps', 'Remove');
    });
    test('should render "Edit" buttons when in edit mode [methodSteps]', () => {
        shouldRenderButtons('methodSteps', 'Edit');
    });
    test('should render "Update" button when in "Edit" button clicked [methodSteps]', () => {
        // Arrange
        enterEditMode();
        renderDraggableList(undefined, 'methodSteps');

        // Act
        const editButton = screen.getAllByRole('button', {name: 'Edit'})[0];

        act(() => {
            userEvent.click(editButton);
        });

        // Assert
        expect(screen.queryAllByText('Update', {selector: 'button'})).toHaveLength(1);

    });
    test('should render "Remove" buttons when in edit mode [notes]', () => {
        shouldRenderButtons('notes', 'Remove');
    });
    test('should render "Edit" buttons when in edit mode [notes]', () => {
        shouldRenderButtons('notes', 'Edit');
    });
    test('should render "Update" button when in "Edit" button clicked [notes]', () => {
        // Arrange
        enterEditMode();
        renderDraggableList(undefined, 'notes');

        // Act
        const editButton = screen.getAllByRole('button', {name: 'Edit'})[0];

        act(() => {
            userEvent.click(editButton);
        });

        // Assert
        expect(screen.queryAllByText('Update', {selector: 'button'})).toHaveLength(1);

    });
    test('should render "Remove" buttons when in edit mode [ingredients]', () => {
        shouldRenderButtons('ingredients', 'Remove');
    });
    test('should render "Edit" buttons when in edit mode [ingredients]', () => {
        shouldRenderButtons('ingredients', 'Edit');
    });

    test('should not render any buttons buttons when not in edit mode', () => {
        // Arrange
        localStorage.removeItem('isEditing');
        renderDraggableList();

        // Act
        // ... nothing

        // Assert
        expect(screen.queryAllByRole('button', {})).toHaveLength(0);
    });

});