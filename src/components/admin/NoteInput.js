import React, {useRef, useState} from 'react';
import Button from "../button/Button";

const NoteInput = (props) => {
    const [description, setDescription] = useState('');
    const textAreaRef = useRef(null);

    const onAdd = () => {
        props.onAdd(description);
        textAreaRef.current.value = '';
        textAreaRef.current.focus();
    }

    return (
        <div>
            <textarea ref={textAreaRef} cols="60" onChange={e => setDescription(e.target.value)} name="note"/>
            <Button type="button" onClick={onAdd}>Add</Button>
        </div>
    );
};

export default NoteInput;