import {UnitType} from "./unitType";

export interface IngredientType {
    id?: number,
    description: string,
    unit?: UnitType,
    quantity?: number,
    ordering?: number
}