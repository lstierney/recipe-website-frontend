import {render, screen} from "@testing-library/react";
import Ingredients from "./Ingredients";
import {isInEditingMode} from "../../../utils/auth";
import {useGetUnitsQuery} from '../../../store/api';

jest.mock('../../../utils/auth');
jest.mock('../../../store/api');

const mockGetUnitsQuery = useGetUnitsQuery as jest.MockedFunction<typeof useGetUnitsQuery>;
const mockIsInEditingMode = isInEditingMode as jest.MockedFunction<typeof isInEditingMode>;

const INGREDIENTS = [
    {
        id: 1,
        description: 'description 1'
    },
    {
        id: 2,
        description: 'description 2'
    }
];

describe('Ingredients component', () => {
    beforeEach(() => {
        mockGetUnitsQuery.mockReturnValue({
            data: [
                {
                    id: 1,
                    name: 'Unit 1'
                },
                {
                    id: 2,
                    name: 'Unit 2'
                }
            ],
            refetch: jest.fn()
        });
    })
    test('renders title', () => {
        // Arrange
        render(<Ingredients onAdd={jest.fn()} onReorder={jest.fn()} onUpdate={jest.fn()} onRemove={jest.fn()}
                            ingredients={[]}/>);

        // Act
        // -- nothing

        // Assert
        const title = screen.getByText('Ingredients', {exact: true});
        expect(title).toBeInTheDocument();
    });
    test('renders "None found" when no ingredients are supplied', () => {
        // Arrange
        render(<Ingredients onAdd={jest.fn()} onUpdate={jest.fn()} onReorder={jest.fn()} onRemove={jest.fn()}
                            ingredients={[]}/>);

        // Act
        // -- nothing

        // Assert
        const noneFound = screen.getByText('None found', {exact: true});
        expect(noneFound).toBeInTheDocument();
    });
    test('renders draggablelist when items supplied', () => {
        // Arrange

        render(<Ingredients onAdd={jest.fn()} onReorder={jest.fn()} onUpdate={jest.fn()} onRemove={jest.fn()}
                            ingredients={INGREDIENTS}/>);

        // Act
        // -- nothing

        // Assert
        expect(screen.getByText('description 1', {exact: true})).toBeInTheDocument();
        expect(screen.getByText('description 2', {exact: true})).toBeInTheDocument();
    });
    test('renders input component when in edit mode', () => {
        // Arrange
        mockIsInEditingMode.mockReturnValue(true);
        render(<Ingredients onAdd={jest.fn()} onReorder={jest.fn()} onRemove={jest.fn()} onUpdate={jest.fn()}
                            ingredients={INGREDIENTS}/>);

        // Act
        // -- nothing

        // Assert
        const addButton = screen.getByRole('button', {name: 'Add'})
        expect(addButton).toBeInTheDocument();

        const textArea = screen.getByRole('textbox', {})
        expect(textArea).toBeInTheDocument();
    });
});