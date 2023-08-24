import React from 'react';
import classes from "../../../main.module.css";
import {isInEditingMode} from "../../../utils/auth";
import NoteInput from "../../admin/NoteInput";
import DraggableList from "../draggablelist/DraggableList";
import {NoteType} from "../../../types/noteType";

type Props = {
    notes: NoteType[],
    onReorder: (notes: NoteType[]) => void,
    onAdd: (noteDescription: string) => void,
    onRemove: (noteDescription: string) => void
}

const Notes = (props: Props) => {
    const isEditMode = isInEditingMode();

    return (
        <section>
            <br/>
            <h2 className={classes.left_align}>Notes</h2>
            <DraggableList onReorder={props.onReorder} onRemove={props.onRemove} items={props.notes} type={'notes'}/>
            {isEditMode && <NoteInput onAdd={props.onAdd}/>}
        </section>
    );
};

export default Notes;