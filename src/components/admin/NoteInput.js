import React, {useState} from 'react';
import Button from "../button/Button";

const NoteInput = (props) => {
    const [description, setDescription] = useState('');

    return (
        <div>
            <textarea cols="60" onChange={e => setDescription(e.target.value)} name="note"/>
            <Button type="button" onClick={() => props.onAdd(description)}>Add</Button>
        </div>
    );
};

export default NoteInput;