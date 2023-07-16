import React from 'react';

const Note = props => {
    const {note} = props;
    return (
        <span>{note.description}</span>
    );
};

export default Note;