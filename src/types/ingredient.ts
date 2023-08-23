import {Unit} from "./unit";

export interface Ingredient {
    id?: number,
    description: string,
    unit?: Unit,
    quantity: number,
    ordering?: number
}