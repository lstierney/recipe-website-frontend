import React from 'react';
import classes from "../../../main.module.css";
import {isInEditingMode} from "../../../utils/auth";
import NoteInput from "../../admin/NoteInput";
import DraggableList from "../draggablelist/DraggableList";

const Notes = props => {
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