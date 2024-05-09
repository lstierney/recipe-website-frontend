import React from 'react';
import classes from "../../../main.module.css";
import {isInEditingMode} from "../../../utils/auth";
import DraggableList from "../draggablelist/DraggableList";
import {NoteType} from "../../../types/noteType";
import {OrderableType} from "../../../types/orderableType";
import MethodStepAndNoteInput from "../../admin/inputs/MethodStepAndNoteInput";

type Props = {
    items: OrderableType[],
    onReorder: (notes: NoteType[]) => void,
    onAdd: (noteDescription: string) => void,
    onRemove: (noteDescription: string) => void,
    onUpdate: (originalDescription: string, newDescription: string) => void
}

const Notes = (props: Props) => {
    const isEditMode = isInEditingMode();

    return (
        <section>
            <br/>
            <h2 className={classes.left_align}>Notes</h2>
            <DraggableList
                onUpdate={props.onUpdate}
                onReorder={props.onReorder}
                onIngredientUpdate={() => {
                }}
                onRemove={props.onRemove}
                items={props.items}
                type={'notes'}
            />
            {isEditMode && <MethodStepAndNoteInput type={'notes'} onAdd={props.onAdd} onUpdate={props.onUpdate}/>}
        </section>
    );
};
export default Notes;