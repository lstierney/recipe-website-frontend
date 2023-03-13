import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {addTag, deleteTag, updateTag} from "../../store/meta-actions";

const AddTag = (props) => {
    const [name, setName] = useState("");
    const [id, setId] = useState();
    const [description, setDescription] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        if (props.tag) {
            setDescription(props.tag.description);
            setName(props.tag.name);
            setId(props.tag.id);
        }
    }, [props.tag]);

    const addTagHandler = () => {
        dispatch(addTag({
            name, description
        }));
    }

    const updateTagHandler = () => {
        dispatch(updateTag({
            id, name, description
        }));
    }

    const deleteTagHandler = () => {
        dispatch(deleteTag(id));
    }

    return (
        <section>
            {props.mode === 'add' && <h2>Add tag</h2>}
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" value={name} onChange={e => setName(e.target.value)}/><br/>
            <label htmlFor="description">Description:</label>
            <input type="text" name="description" value={description}
                   onChange={e => setDescription(e.target.value)}/><br/>

            {props.mode === 'add' &&
                <button type="button" onClick={() => addTagHandler()}>Add Tag</button>
            }
            {props.mode !== 'add' &&
                <button type="button" onClick={() => updateTagHandler()}>Update Tag</button>
            }
            {props.mode !== 'add' &&
                <button type="button" onClick={() => deleteTagHandler()}>Delete</button>
            }
        </section>
    );
};

export default AddTag;