import Home from "./Home";
import {screen} from "@testing-library/react";
import {renderWithProviders} from "../utils/test-utils";

describe('Home page', () => {
    test('renders main title (using config)', () => {
        // Arrange
        renderWithProviders(<Home/>);

        // Act
        // ...nothing

        // Assert
        const mainTitle = screen.getByText("My Veggie Recipes", {exact: true});
        expect(mainTitle).toBeInTheDocument();
    });
});