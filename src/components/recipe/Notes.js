import React from 'react';
import classes from "../../main.module.css";
import {isAdminUser} from "../../utils/auth";
import NoteInput from "../admin/NoteInput";
import DraggableList from "./DraggableList";

const Notes = (props) => {
    const isAdmin = isAdminUser();

    return (
        <section>
            <br/>
            <h2 className={classes.left_align}>Notes</h2>
            <hr/>
            <DraggableList onReorder={props.onReorder} onRemove={props.onRemove} items={props.notes} type={'notes'}/>
            {isAdmin && <NoteInput onAdd={props.onAdd}/>}
        </section>
    );
};

export default Notes;