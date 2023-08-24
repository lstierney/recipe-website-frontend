import {MethodStepType} from "./methodStepType";
import {NoteType} from "./noteType";
import {IngredientType} from "./ingredientType";

export interface RecipeType {
    id: number,
    name: string,
    description: string,
    imageFileName: string,
    ingredients?: IngredientType[],
    methodSteps?: MethodStepType[],
    notes?: NoteType[]
}