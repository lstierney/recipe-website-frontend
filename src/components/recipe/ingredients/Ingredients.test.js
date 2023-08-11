import {render, screen} from "@testing-library/react";
import Ingredients from "./Ingredients";
import {isInEditingMode} from "../../../utils/auth";
import {useGetUnitsQuery} from '../../../store/api';

jest.mock('../../../utils/auth');
jest.mock('../../../store/api');

describe('Ingredients component', () => {
    beforeEach(() => {
        useGetUnitsQuery.mockReturnValue({
            data: [
                {
                    id: 1,
                    name: 'Unit 1'
                },
                {
                    id: 2,
                    name: 'Unit 2'
                }
            ]
        });
    })
    test('renders title', () => {
        // Arrange
        render(<Ingredients/>);

        // Act
        // -- nothing

        // Assert
        const title = screen.getByText('Ingredients', {exact: true});
        expect(title).toBeInTheDocument();
    });
    test('renders "None found" when no ingredients are supplied', () => {
        // Arrange
        render(<Ingredients/>);

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
        render(<Ingredients ingredients={items}/>);

        // Act
        // -- nothing

        // Assert
        expect(screen.getByText('description 1', {exact: true})).toBeInTheDocument();
        expect(screen.getByText('description 2', {exact: true})).toBeInTheDocument();
    });
    test('renders input component when in edit mode', () => {
        // Arrange
        isInEditingMode.mockReturnValue(true);
        render(<Ingredients/>);

        // Act
        // -- nothing

        // Assert
        const addButton = screen.getByRole('button', {name: 'Add'})
        expect(addButton).toBeInTheDocument();

        const textArea = screen.getByRole('textbox', {})
        expect(textArea).toBeInTheDocument();
    });
});