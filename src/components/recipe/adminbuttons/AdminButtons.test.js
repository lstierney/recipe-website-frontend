import {fireEvent, screen} from "@testing-library/react";
import AdminButtons from "./AdminButtons";
import {renderWithProviders} from "../../../utils/test-utils";
import {isAdminUser, isInEditingMode} from "../../../utils/auth";

jest.mock('../../../utils/auth');

const EDIT_MODE = 'Edit Mode';
const READ_ONLY_MODE = 'Read Only Mode';
const SUBMIT = 'Submit';

const onEditModeChange = jest.fn();
const addRecipeHandler = jest.fn();

const setIsAdmin = isAdmin => {
    isAdminUser.mockReturnValue(isAdmin);
};
const setIsEditMode = isEditMode => {
    isInEditingMode.mockReturnValue(isEditMode);
};

describe('AdminButton component', () => {
    beforeEach(() => {
        setIsAdmin(true)
    });
    test('Doesnt render any buttons when not admin', () => {
        // Arrange
        setIsAdmin(false);
        renderWithProviders(<AdminButtons onEditModeChange={onEditModeChange}>stuff</AdminButtons>);

        // Act
        // -- nothing

        // Assert
        const buttons = screen.queryAllByRole('button', {});
        expect(buttons).toHaveLength(0);

    });
    test('When admin but not edit mode "Edit Mode" buttons are rendered', () => {
        // Arrange
        renderWithProviders(<AdminButtons onEditModeChange={onEditModeChange}>stuff</AdminButtons>);

        // Act
        // -- nothing

        // Assert
        const buttons = screen.queryAllByRole('button', {name: EDIT_MODE});
        expect(buttons).toHaveLength(2);

    });
    test('When admin but not edit mode "Read Only Mode" buttons are not rendered', () => {
        // Arrange
        renderWithProviders(<AdminButtons onEditModeChange={onEditModeChange}>stuff</AdminButtons>);

        // Act
        // -- nothing

        // Assert
        const buttons = screen.queryAllByRole('button', {name: READ_ONLY_MODE});
        expect(buttons).toHaveLength(0);

    });
    test('When admin but not edit mode "Submit" buttons are not rendered', () => {
        // Arrange
        renderWithProviders(<AdminButtons onEditModeChange={onEditModeChange}>stuff</AdminButtons>);

        // Act
        // -- nothing

        // Assert
        const buttons = screen.queryAllByRole('button', {name: SUBMIT});
        expect(buttons).toHaveLength(0);

    });
    test('When admin and "Edit Mode" button is clicked "Read Only Mode" buttons are rendered', () => {
        // Arrange
        renderWithProviders(<AdminButtons onEditModeChange={onEditModeChange}>stuff</AdminButtons>);

        // Act
        fireEvent.click(screen.getAllByRole('button', {name: EDIT_MODE})[0]);

        // Assert
        const buttons = screen.queryAllByRole('button', {name: READ_ONLY_MODE});
        expect(buttons).toHaveLength(2);

    });
    test('When admin and "Edit Mode" button is clicked "Submit" buttons are rendered', () => {
        // Arrange
        renderWithProviders(<AdminButtons onEditModeChange={onEditModeChange}>stuff</AdminButtons>);

        // Act
        fireEvent.click(screen.getAllByRole('button', {name: EDIT_MODE})[0]);

        // Assert
        const buttons = screen.queryAllByRole('button', {name: SUBMIT});
        expect(buttons).toHaveLength(2);

    });
    test('When admin and "Edit Mode" button is clicked "Edit Mode" button is removed', () => {
        // Arrange
        renderWithProviders(<AdminButtons onEditModeChange={onEditModeChange}>stuff</AdminButtons>);

        // Act
        fireEvent.click(screen.getAllByRole('button', {name: EDIT_MODE})[0]);

        // Act
        // -- nothing

        // Assert
        const buttons = screen.queryAllByRole('button', {name: EDIT_MODE});
        expect(buttons).toHaveLength(0);

    });
    test('Clicking "Edit Mode" causes "Read Only Mode" and "Submit" buttons to render', () => {
        // Arrange
        renderWithProviders(<AdminButtons onEditModeChange={onEditModeChange}>stuff</AdminButtons>);

        // Act
        // -- nothing
        fireEvent.click(screen.getAllByRole('button', {name: EDIT_MODE})[0]);

        // Assert
        let buttons = screen.getAllByRole('button', {name: SUBMIT});
        expect(buttons).toHaveLength(2);

        buttons = screen.getAllByRole('button', {name: READ_ONLY_MODE});
        expect(buttons).toHaveLength(2);
    });

    test('Clicking "Read Only Mode" causes "Edit Mode" button to render', () => {
        // Arrange
        renderWithProviders(<AdminButtons onEditModeChange={onEditModeChange}>stuff</AdminButtons>);

        // Act
        // -- nothing
        fireEvent.click(screen.getAllByRole('button', {name: EDIT_MODE})[0]); // move to edit mode
        fireEvent.click(screen.getAllByRole('button', {name: READ_ONLY_MODE})[0]);

        // Assert
        const buttons = screen.getAllByRole('button', {name: EDIT_MODE});
        expect(buttons).toHaveLength(2);
    });
    test('Clicking "Read Only Mode" causes "Read Only Mode" button to be removed', () => {
        // Arrange
        renderWithProviders(<AdminButtons onEditModeChange={onEditModeChange}>stuff</AdminButtons>);

        // Act
        fireEvent.click(screen.getAllByRole('button', {name: EDIT_MODE})[0]); // move to edit mode
        fireEvent.click(screen.getAllByRole('button', {name: READ_ONLY_MODE})[0]);

        // Assert
        const buttons = screen.queryAllByRole('button', {name: READ_ONLY_MODE});
        expect(buttons).toHaveLength(0);
    });
    test('Clicking "Submit" causes expected method to be invoked', () => {
        // Arrange
        renderWithProviders(<AdminButtons onEditModeChange={onEditModeChange}
                                          addRecipeHandler={addRecipeHandler}>stuff</AdminButtons>);

        // Act
        // -- nothing
        fireEvent.click(screen.getAllByRole('button', {name: EDIT_MODE})[0]); // move to edit mode
        fireEvent.click(screen.getAllByRole('button', {name: SUBMIT})[0]);

        // Assert
        expect(addRecipeHandler).toHaveBeenCalledTimes(1);
    });
    test('Clicking "Edit Mode" causes expected method to be invoked', () => {
        // Arrange
        renderWithProviders(<AdminButtons onEditModeChange={onEditModeChange}
                                          addRecipeHandler={addRecipeHandler}>stuff</AdminButtons>);

        // Act
        // -- nothing
        fireEvent.click(screen.getAllByRole('button', {name: EDIT_MODE})[0]);

        // Assert
        expect(onEditModeChange).toHaveBeenCalledWith(true);
    });
    test('Clicking "Edit Mode" causes expected method to be invoked', () => {
        // Arrange
        renderWithProviders(<AdminButtons onEditModeChange={onEditModeChange}
                                          addRecipeHandler={addRecipeHandler}>stuff</AdminButtons>);

        // Act
        // -- nothing
        fireEvent.click(screen.getAllByRole('button', {name: EDIT_MODE})[0]); // move to edit mode
        fireEvent.click(screen.getAllByRole('button', {name: READ_ONLY_MODE})[0]);

        // Assert
        expect(onEditModeChange).toHaveBeenCalledWith(false);
    });
})