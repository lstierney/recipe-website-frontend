import React, {useState} from 'react';
import Button from "../button/Button";

const MethodStepInput = (props) => {
    const [description, setDescription] = useState('');

    return (
        <div>
            <textarea cols="60" onChange={e => setDescription(e.target.value)} name="methodStep"/>
            <Button type="button" onClick={() => props.onAdd(description)}>Add</Button>
        </div>
    );
};

export default MethodStepInput;