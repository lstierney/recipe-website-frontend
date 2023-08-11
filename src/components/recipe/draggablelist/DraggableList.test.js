import {renderWithProviders} from "../../../utils/test-utils";
import {screen} from "@testing-library/react";
import DraggableList from './DraggableList';
import {useGetUnitsQuery} from "../../../store/api";

jest.mock('../../../store/api');

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

describe('DraggableList component', () => {

    beforeEach(() => {
        useGetUnitsQuery.mockReturnValue({
            data: []
        });
    });

    test('renders list of Items', () => {
        // Arrange
        renderWithProviders(<DraggableList items={ITEMS} type={'notes'}/>);

        // Act
        // ... nothing

        // Assert
        expect(screen.getAllByRole('separator')).toHaveLength(2);
        expect(screen.getByText('Description One')).toBeInTheDocument();
        expect(screen.getByText('Description Two')).toBeInTheDocument();
    });
    test('does not display "None found" when Items are supplied', () => {
        // Arrange
        renderWithProviders(<DraggableList items={ITEMS}/>);

        // Act
        // ... nothing

        // Assert
        const message = screen.queryByText('None found', {exact: false});
        expect(message).not.toBeInTheDocument();
    });
    test('displays "None Found" when no Items are supplied', () => {
        // Arrange
        renderWithProviders(<DraggableList items={[]}/>);

        // Act
        // ... nothing

        // Assert
        const message = screen.getByText('None found', {exact: true});
        expect(message).toBeInTheDocument();
    });
    test('does not render any Items when none are supplied', () => {
        // Arrange
        renderWithProviders(<DraggableList items={[]}/>);

        // Act
        // ... nothing

        // Assert
        expect(screen.queryAllByRole('listitem')).toHaveLength(0);
    });
    test('renders "STEP X" when Items are of type "methodSteps"', () => {
        // Arrange
        renderWithProviders(<DraggableList items={ITEMS} type={'methodSteps'}/>);

        // Act
        // ... nothing

        // Assert
        expect(screen.getByText('STEP 1', {})).toBeInTheDocument();
        expect(screen.getByText('STEP 2', {})).toBeInTheDocument();
    });
    test('does not render "STEP X" when Items are not of type "methodSteps"', () => {
        // Arrange
        renderWithProviders(<DraggableList items={ITEMS} type={'ingredients'}/>);

        // Act
        // ... nothing

        // Assert
        expect(screen.queryByText('STEP 1', {})).not.toBeInTheDocument();
        expect(screen.queryByText('STEP 2', {})).not.toBeInTheDocument();
    });
    test('should render "Delete" buttons when in edit mode', () => {
        // Arrange
        localStorage.setItem('isEditing', 'true');
        localStorage.setItem('token', 'fake token');
        localStorage.setItem('expiration', '' + (new Date().getTime() + 1000));

        renderWithProviders(<DraggableList items={ITEMS}/>);

        // Act
        // ... nothing

        // Assert
        expect(screen.queryAllByRole('button', {})).toHaveLength(2);
    });
    test('should not render "Delete" buttons when not in edit mode', () => {
        // Arrange
        localStorage.removeItem('isEditing');
        renderWithProviders(<DraggableList items={ITEMS}/>);

        // Act
        // ... nothing

        // Assert
        expect(screen.queryAllByRole('button', {})).toHaveLength(0);
    });

});