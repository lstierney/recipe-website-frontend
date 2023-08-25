import React from 'react';
import {NoteType} from "../../../types/noteType";

type Props = {
    note: NoteType
}

const Note = (props: Props) => {
    const {note} = props;
    return (
        <span>{note.description}</span>
    );
};

export default Note;