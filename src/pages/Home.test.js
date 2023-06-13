import config from "../config";
import Home from "./Home";
import {render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";

describe('Home page', () => {
    test('renders main title (using config)', () => {
        // Arrange
        render(<MemoryRouter><Home/></MemoryRouter>);

        // Act
        // ...nothing

        // Assert
        const mainTitle = screen.getByText(config.PAGE_TITLE, {exact: true});
        expect(mainTitle).toBeInTheDocument();
    });
});