import React, {useState} from 'react';

const NoteInput = (props) => {
    const [description, setDescription] = useState('');

    return (
        <div>
            <textarea cols="60" onChange={e => setDescription(e.target.value)} name="note"/>
            <button type="button" onClick={() => props.onAdd(description)}>Add</button>
        </div>
    );
};

export default NoteInput;