import {CrockeryType} from "./crockeryType";

export interface ServedOnType {
    id?: number,
    heated: boolean,
    crockery: CrockeryType
}