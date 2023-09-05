import {fireEvent, screen} from "@testing-library/react";
import AdminButtons from "./AdminButtons";
import {renderWithProviders} from "../../../utils/test-utils";
import {isAdminUser} from "../../../utils/auth";

jest.mock('../../../utils/auth');

const EDIT_MODE = 'Edit Mode';
const READ_ONLY_MODE = 'Read Only Mode';
const SUBMIT = 'Submit';
const MARK_AS_COOKED = 'Mark as Cooked';

const onEditModeChange = jest.fn();
const addRecipeHandler = jest.fn();
const onMarkRecipeAsCooked = jest.fn();
const mockIsAdminUser = isAdminUser as jest.MockedFunction<typeof isAdminUser>;

const clickEditMode = () => fireEvent.click(screen.getAllByRole('button', {name: EDIT_MODE})[0]);
const clickReadOnlyMode = () => fireEvent.click(screen.getAllByRole('button', {name: READ_ONLY_MODE})[0]);
const clickSubmit = () => fireEvent.click(screen.getAllByRole('button', {name: SUBMIT})[0]);
const clickMarkAsCooked = () => fireEvent.click(screen.getAllByRole('button', {name: MARK_AS_COOKED})[0]);

const renderButtons = () => {
    return renderWithProviders(
        <AdminButtons
            addRecipeHandler={addRecipeHandler}
            onEditModeChange={onEditModeChange}
            onMarkRecipeAsCooked={onMarkRecipeAsCooked}
        >stuff</AdminButtons>);
}

describe('AdminButton component', () => {
    beforeEach(() => {
        mockIsAdminUser.mockReturnValue(true);
    });
    test('Doesnt render any buttons when not admin', () => {
        // Arrange
        mockIsAdminUser.mockReturnValue(false);
        renderButtons();
        
        // Act
        // -- nothing

        // Assert
        const buttons = screen.queryAllByRole('button', {});
        expect(buttons).toHaveLength(0);

    });
    test('When admin but not edit mode "Edit Mode" buttons are rendered', () => {
        // Arrange
        renderButtons();

        // Act
        // -- nothing

        // Assert
        const buttons = screen.queryAllByRole('button', {name: EDIT_MODE});
        expect(buttons).toHaveLength(2);

    });
    test('When admin but not edit mode "Mark as Cooked" buttons are rendered', () => {
        // Arrange
        renderButtons();

        // Act
        // -- nothing

        // Assert
        const buttons = screen.queryAllByRole('button', {name: MARK_AS_COOKED});
        expect(buttons).toHaveLength(2);

    });
    test('When admin but not edit mode "Read Only Mode" buttons are not rendered', () => {
        // Arrange
        renderButtons();

        // Act
        // -- nothing

        // Assert
        const buttons = screen.queryAllByRole('button', {name: READ_ONLY_MODE});
        expect(buttons).toHaveLength(0);

    });
    test('When admin but not edit mode "Submit" buttons are not rendered', () => {
        // Arrange
        renderButtons();

        // Act
        // -- nothing

        // Assert
        const buttons = screen.queryAllByRole('button', {name: SUBMIT});
        expect(buttons).toHaveLength(0);

    });
    test('When admin and "Edit Mode" button is clicked "Read Only Mode" buttons are rendered', () => {
        // Arrange
        renderButtons();
        
        // Act
        clickEditMode();

        // Assert
        const buttons = screen.queryAllByRole('button', {name: READ_ONLY_MODE});
        expect(buttons).toHaveLength(2);

    });
    test('When admin and "Edit Mode" button is clicked "Mark as Cooked" buttons are rendered', () => {
        // Arrange
        renderButtons();

        // Act
        clickEditMode();

        // Assert
        const buttons = screen.queryAllByRole('button', {name: MARK_AS_COOKED});
        expect(buttons).toHaveLength(2);

    });
    test('When admin and "Edit Mode" button is clicked "Submit" buttons are rendered', () => {
        // Arrange
        renderButtons();
        
        // Act
        clickEditMode();

        // Assert
        const buttons = screen.queryAllByRole('button', {name: SUBMIT});
        expect(buttons).toHaveLength(2);

    });
    test('When admin and "Edit Mode" button is clicked "Edit Mode" button is removed', () => {
        // Arrange
        renderButtons();
        
        // Act
        clickEditMode();

        // Assert
        const buttons = screen.queryAllByRole('button', {name: EDIT_MODE});
        expect(buttons).toHaveLength(0);

    });
    test('Clicking "Edit Mode" causes "Read Only Mode" and "Submit" buttons to render', () => {
        // Arrange
        renderButtons();

        // Act
        clickEditMode();

        // Assert
        let buttons = screen.getAllByRole('button', {name: SUBMIT});
        expect(buttons).toHaveLength(2);

        buttons = screen.getAllByRole('button', {name: READ_ONLY_MODE});
        expect(buttons).toHaveLength(2);
    });

    test('Clicking "Read Only Mode" causes "Edit Mode" button to render', () => {
        // Arrange
        renderButtons();

        // Act
        clickEditMode();
        clickReadOnlyMode();

        // Assert
        const buttons = screen.getAllByRole('button', {name: EDIT_MODE});
        expect(buttons).toHaveLength(2);
    });
    test('Clicking "Read Only Mode" causes "Read Only Mode" button to be removed', () => {
        // Arrange
        renderButtons();

        // Act
        clickEditMode();
        clickReadOnlyMode();

        // Assert
        const buttons = screen.queryAllByRole('button', {name: READ_ONLY_MODE});
        expect(buttons).toHaveLength(0);
    });
    test('Clicking "Submit" causes expected method to be invoked', () => {
        // Arrange
        renderButtons();

        // Act
        clickEditMode();
        clickSubmit();

        // Assert
        expect(addRecipeHandler).toHaveBeenCalledTimes(1);
    });
    test('Clicking "Mark as Cooked" causes expected method to be invoked', () => {
        // Arrange
        renderButtons();

        // Act
        clickMarkAsCooked();

        // Assert
        expect(onMarkRecipeAsCooked).toHaveBeenCalledTimes(1);
    });
    test('Clicking "Edit Mode" and then "Mark as Cooked" causes expected method to be invoked', () => {
        // Arrange
        renderButtons();

        // Act
        clickEditMode();
        clickMarkAsCooked();

        // Assert
        expect(onMarkRecipeAsCooked).toHaveBeenCalledTimes(1);
    });
    test('Clicking "Edit Mode" causes expected method to be invoked', () => {
        // Arrange
        renderButtons();

        // Act
        clickEditMode();

        // Assert
        expect(onEditModeChange).toHaveBeenCalledWith(true);
    });
    test('Clicking "Edit Mode" then "Read Only Mode" causes expected method to be invoked', () => {
        // Arrange
        renderButtons();

        // Act
        clickEditMode();
        clickReadOnlyMode();

        // Assert
        expect(onEditModeChange).toHaveBeenCalledWith(false);
    });
})