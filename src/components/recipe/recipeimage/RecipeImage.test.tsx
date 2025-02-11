import RecipeImage from "./RecipeImage";
import {fireEvent, render, screen} from "@testing-library/react";


describe('RecipeImage', () => {
    test('renders image', () => {
        // Arrange
        render(<RecipeImage onClick={jest.fn()} alt='Alt Text' imageFolderPath='/images/1 - Recipe One/'
                            imageFileName='recipe.jpg'/>);

        // Act
        // -- nothing

        // Assert
        const image = screen.getByRole('img', {});
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('alt', 'Alt Text');
        expect(image).toHaveAttribute('src', 'http://localhost:8080/images/1 - Recipe One/recipe.jpg');
    });

    test('executes onClick when clicked', () => {
        // Arrange
        const onClick = jest.fn();
        render(<RecipeImage alt='Alt Text' imageFileName='recipe.jpg' imageFolderPath='/images/1 - Recipe One/'
                            onClick={onClick}/>);

        // Act
        fireEvent.click(screen.getByRole('img', {}));


        // Assert
        expect(onClick).toHaveBeenCalledTimes(1);
    });

});