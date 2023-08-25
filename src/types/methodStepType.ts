import {OrderableType} from "./orderableType";

export interface MethodStepType extends OrderableType {
    id?: number,
    description: string,
    number?: number
}