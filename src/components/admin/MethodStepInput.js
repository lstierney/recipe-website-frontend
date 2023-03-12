import React, {useState} from 'react';

const MethodStepInput = (props) => {
    const [description, setDescription] = useState('');

    return (
        <div>
            <textarea cols="60" onChange={e => setDescription(e.target.value)} name="methodStep"/>
            <button type="button" onClick={() => props.onAdd(description)}>Add</button>
        </div>
    );
};

export default MethodStepInput;