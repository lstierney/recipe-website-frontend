import {MethodStepType} from "./methodStepType";
import {NoteType} from "./noteType";
import {IngredientType} from "./ingredientType";
import {ServedOnType} from "./servedOnType";
import {RecipePreviewType} from "./recipePreviewType";
import {TagType} from "./tagType";

export interface RecipeType extends RecipePreviewType {
    ingredients?: IngredientType[],
    methodSteps?: MethodStepType[],
    notes?: NoteType[],
    cookingTime: number,
    basedOn?: string,
    servedOn?: ServedOnType,
    image?: File,
    tags?: TagType[],
    deleted: number
}