import React from 'react';
import {NoteType} from "../../../types/noteType";
import RecipeLinkParser from "../recipeLinkParser/RecipeLinkParser";

type Props = {
    note: NoteType
}

const Note = (props: Props) => {
    const {note} = props;
    return (
        <span><RecipeLinkParser>{note.description}</RecipeLinkParser></span>
    );
};

export default Note;