import React, {useEffect, useState} from 'react';
import {useAddTagMutation, useDeleteTagMutation, useUpdateTagMutation} from "../../../store/api";
import {toastUtils} from "../../../utils/toast-utils";
import Button from "../../button/Button";
import {TagType} from "../../../types/tagType";

type Props = {
    tag: TagType,
    mode: 'add' | 'edit'
}

const AddTag: React.FC<Props> = props => {
    const [name, setName] = useState("");
    const [id, setId] = useState<number | undefined>(undefined);
    const [description, setDescription] = useState("");
    const [addTag] = useAddTagMutation();
    const [deleteTag] = useDeleteTagMutation();
    const [updateTag] = useUpdateTagMutation();
    const toast = toastUtils();

    useEffect(() => {
        if (props.tag) {
            setDescription(props.tag.description);
            setName(props.tag.name);
            setId(props.tag.id);
        }
    }, [props.tag]);

    const addTagHandler = async () => {
        try {
            await addTag({name, description}).unwrap();
            setName('');
            setDescription('');
            toast.success("Added Tag");
        } catch (err) {
            toast.error('Failed to add Tag: ' + err);
        }
    }

    const updateTagHandler = async () => {
        try {
            await updateTag({id, name, description}).unwrap();
            toast.success("Updated Tag");
        } catch (err) {
            toast.error('Failed to update Tag: ' + err);
        }
    }

    const deleteTagHandler = async () => {
        try {
            await deleteTag(id);
            toast.success("Deleted Tag");
        } catch (err) {
            toast.error('Failed to delete Tag: ' + err);
        }
    }

    return (
        <section>
            {props.mode === 'add' && <h2>Add Tag</h2>}
            <label htmlFor="name">Name:</label><br/>
            <input type="text" name="name" value={name} onChange={e => setName(e.target.value)}/><br/>
            <label htmlFor="description">Description:</label><br/>
            <input type="text" name="description" value={description}
                   onChange={e => setDescription(e.target.value)}/><br/>

            {props.mode === 'add' &&
                <Button type="button" onClick={() => addTagHandler()}>Add Tag</Button>
            }
            {props.mode !== 'add' &&
                <Button type="button" onClick={() => updateTagHandler()}>Update Tag</Button>
            }
            {props.mode !== 'add' &&
                <Button type="button" onClick={() => deleteTagHandler()}>Delete</Button>
            }
        </section>
    );
};

export default AddTag;