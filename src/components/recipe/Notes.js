import React from 'react';
import classes from "../../main.module.css";
import {isAdminUser} from "../../utils/auth";
import NotesList from "./NotesList";
import NoteInput from "../admin/NoteInput";

const Notes = (props) => {
    const isAdmin = isAdminUser();

    return (
        <section>
            <br/>
            <h2 className={classes.left_align}>Notes</h2>
            <hr/>
            <NotesList onReorder={props.onReorder} onRemove={props.onRemove} notes={props.notes}/>
            {isAdmin && <NoteInput onAdd={props.onAdd}/>}
        </section>
    );
};

export default Notes;