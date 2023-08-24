import {OrderableType} from "./orderableType";

export interface NoteType extends OrderableType {
    id?: number,
    description: string
}