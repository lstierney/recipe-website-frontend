import React, {useState} from 'react';
import classes from "./AddRecipe.module.css";

const MethodStepInput = (props) => {
    const [description, setDescription] = useState('');

    return (
        <div>
            <textarea cols="60" onChange={e => setDescription(e.target.value)} name="methodStep"/>
            <button type="button" className={classes.button} onClick={() => props.onAdd(description)}>Add</button>
        </div>
    );
};

export default MethodStepInput;