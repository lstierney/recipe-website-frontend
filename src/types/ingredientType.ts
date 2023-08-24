import {UnitType} from "./unitType";
import {OrderableType} from "./orderableType";

export interface IngredientType extends OrderableType {
    id?: number,
    description: string,
    unit?: UnitType,
    quantity?: number
}