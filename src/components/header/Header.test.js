import Header from './Header';
import {screen} from "@testing-library/react";
import {renderWithProviders} from "../../utils/test-utils";

describe('Header', () => {
    test('renders Logo', () => {
        // Arrange
        renderWithProviders(<Header/>);

        // Act
        // ...nothing

        // Assert
        const logo = screen.getByAltText("Logo", {exact: true});
        expect(logo).toBeInTheDocument();
    });
});