import {screen} from "@testing-library/react";
import {renderWithProviders} from "../../utils/test-utils";

import ImageRotator from "./ImageRotator";

const RECIPES_LIST = [
    {
        id: 1,
        name: 'Recipe One',
        description: 'Recipe One Description',
        imageFileName: 'recipe1.jpg'
    }, {
        id: 2,
        name: 'Recipe Two',
        description: 'Recipe Two Description',
        imageFileName: 'recipe2.jpg'
    }

];

describe('ImageRotator component', () => {
    test('renders two supplied images', () => {
        // Arrange
        renderWithProviders(<ImageRotator images={RECIPES_LIST}/>);

        // Act
        // ...nothing

        // Assert
        const image1 = screen.getByAltText('Recipe One');
        const image2 = screen.getByAltText('Recipe Two');

        // Check that the images are initially hidden
        expect(image1).toBeVisible();
        expect(image2).toBeVisible();
    });
});