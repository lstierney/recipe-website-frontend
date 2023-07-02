import React, {useEffect, useState} from 'react';
import _ from 'lodash';
import classes from '../../main.module.css';
import {Reorder} from "framer-motion";
import {isAdminUser} from "../../utils/auth";

const NotesList = (props) => {
    const isAdmin = isAdminUser();
    const [notes, setNotes] = useState(props.notes);

    useEffect(() => {
        setNotes(props.notes);
    }, [props.notes]);

    return (
        <Reorder.Group axis="y" values={notes} onReorder={setNotes}>
            {!_.isEmpty(notes) && notes.map(note => (
                <Reorder.Item key={note.id} value={note}>
                    <div className={classes.note} onMouseUp={() => {
                        props.onReorder(notes)
                    }}>
                        {note.description}&nbsp;
                        {isAdmin &&
                            <button type="button"
                                    onClick={() => {
                                        props.onRemove(note.description)
                                    }}>Remove</button>}
                    </div>
                </Reorder.Item>))}
            {_.isEmpty(notes) && <p>No Notes found</p>}
        </Reorder.Group>
    );
};

export default NotesList;