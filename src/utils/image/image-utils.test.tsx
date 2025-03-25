import {RecipePreviewType} from '../../types/recipePreviewType'
import {getRandomImageName} from "./image-utils";

describe('getRandomImageName', () => {
    test('should return the only image for a recipe with just one image', () => {
        const recipe: RecipePreviewType = {
            name: 'test',
            description: 'testing',
            cooked: 1,
            imageFolderPath: '/path/to/images',
            imageFileNames: ['image1.jpg']
        };
        expect(getRandomImageName(recipe)).toBe('image1.jpg');
    });

    test('should return an image from a list of images', () => {
        const recipe: RecipePreviewType = {
            name: 'test',
            description: 'testing',
            cooked: 1,
            imageFolderPath: '/path/to/images',
            imageFileNames: ['image1.jpg', 'image2.jpg', 'image3.jpg']
        };
        expect(recipe.imageFileNames).toContain(getRandomImageName(recipe));
    });

});