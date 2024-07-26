import ManageIdea from "./ManageIdea";
import {screen} from "@testing-library/react";
import {renderWithProviders} from "../../../utils/test-utils";
import {IdeaType} from "../../../types/ideaType";
import * as reduxAPI from "../../../store/api";

jest.mock('../../../store/api');

const mockUseAddIdeaMutation = reduxAPI.useAddIdeaMutation as jest.Mock;
const mockUseDeleteIdeaMutation = reduxAPI.useDeleteIdeaMutation as jest.Mock;
const mockUseUpdateIdeaMutation = reduxAPI.useUpdateIdeaMutation as jest.Mock;

const idea: IdeaType = {
    name: "Idea Name",
    url: "Idea Url"
}

describe('ManageIdea component', () => {
    beforeEach(() => {
        mockUseAddIdeaMutation.mockReturnValue([jest.fn(), {data: null, error: null, isLoading: false}]);
        mockUseDeleteIdeaMutation.mockReturnValue([jest.fn(), {data: null, error: null, isLoading: false}]);
        mockUseUpdateIdeaMutation.mockReturnValue([jest.fn(), {data: null, error: null, isLoading: false}]);
    });
    test('renders "Add Idea" heading when in "add" mode', () => {
        // Arrange
        renderWithProviders(<ManageIdea idea={idea} mode={'add'}/>);

        // Assert
        expect(screen.getByRole('heading', {name: 'Add Idea'})).toBeInTheDocument();
    });
    test('renders "Add Idea" button when in "add" mode', () => {
        // Arrange
        renderWithProviders(<ManageIdea idea={idea} mode={'add'}/>);

        // Assert
        expect(screen.getByRole('button', {name: 'Add Idea'})).toBeInTheDocument();
    });
    test('does not render "Update Idea" button when in "add" mode', async () => {
        // Arrange
        renderWithProviders(<ManageIdea idea={idea} mode={'add'}/>);

        // Assert
        expect(screen.queryByRole('button', {name: 'Update Idea'})).not.toBeInTheDocument();
    });
    test('does not render "Delete" button when in "add" mode', async () => {
        // Arrange
        renderWithProviders(<ManageIdea idea={idea} mode={'add'}/>);

        // Assert
        expect(screen.queryByRole('button', {name: 'Delete'})).not.toBeInTheDocument();
    });
    ////
    test('renders "Update Idea" button when in "edit" mode', () => {
        // Arrange
        renderWithProviders(<ManageIdea idea={idea} mode={'edit'}/>);

        // Assert
        expect(screen.getByRole('button', {name: 'Update Idea'})).toBeInTheDocument();
    });
    test('renders "Delete" button when in "edit" mode', () => {
        // Arrange
        renderWithProviders(<ManageIdea idea={idea} mode={'edit'}/>);

        // Assert
        expect(screen.getByRole('button', {name: 'Delete'})).toBeInTheDocument();
    });
    test('does not render "Add Idea" button when in "edit" mode', async () => {
        // Arrange
        renderWithProviders(<ManageIdea idea={idea} mode={'edit'}/>);

        // Assert
        expect(screen.queryByRole('button', {name: 'Add Idea'})).not.toBeInTheDocument();
    });
    test('renders input elements with the details of the Idea when in "edit" mode', async () => {
        // Arrange
        renderWithProviders(<ManageIdea idea={idea} mode={'edit'}/>);

        // Assert
        expect(screen.getByDisplayValue('Idea Name')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Idea Url')).toBeInTheDocument();
    });
});