import {renderWithProviders} from "../../utils/test-utils";
import Ideas from "./Ideas";
import {screen} from "@testing-library/react";
import React from "react";
import {useGetIdeasQuery} from "../../store/api";
import {IdeaType} from "../../types/ideaType";

jest.mock('../../store/api');
const mockGetIdeasQuery = useGetIdeasQuery as jest.MockedFunction<typeof useGetIdeasQuery>;

const IDEAS: IdeaType[] = [
    {
        name: "Idea 1 Name",
        url: "Idea 1 Url"
    },
    {
        name: "Idea 2 Name",
        url: "Idea 2 Url"
    }
];

const prepareGetIdeasMock = (ideas: IdeaType[]) => {
    mockGetIdeasQuery.mockReturnValue({
        data: ideas,
        refetch: jest.fn()
    });
}

describe('Ideas Page', () => {
    beforeEach(() => {
        prepareGetIdeasMock(IDEAS);
    });

    afterEach(() => {
        //jest.resetAllMocks();
    });

    test('renders list of Ideas when Ideas are found', async () => {
        // Arrange
        renderWithProviders(<Ideas/>);

        // Assert
        expect(screen.getByRole('heading', {name: /Ideas/i})).toBeInTheDocument();

        // Check the list
        const firstIdea = screen.getByText('Idea 1 Name');
        expect(firstIdea).toHaveAttribute('title', 'Idea 1 Name');
        expect(firstIdea).toHaveAttribute('href', 'Idea 1 Url');

        const secondIdea = screen.getByText('Idea 2 Name');
        expect(secondIdea).toHaveAttribute('title', 'Idea 2 Name');
        expect(secondIdea).toHaveAttribute('href', 'Idea 2 Url');
    });
});