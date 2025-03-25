import {RecipePreviewType} from "../../types/recipePreviewType";

export const getRandomImageName = (recipe: RecipePreviewType): string => {
    const randomIndex = Math.floor(Math.random() * recipe.imageFileNames.length);
    return recipe.imageFileNames[randomIndex];
}