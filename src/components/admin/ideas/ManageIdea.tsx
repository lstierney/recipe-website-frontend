import React, {useEffect, useState} from 'react';
import {useAddIdeaMutation, useDeleteIdeaMutation, useUpdateIdeaMutation} from "../../../store/api";
import {toastUtils} from "../../../utils/toast-utils";
import Button from "../../button/Button";
import {IdeaType} from "../../../types/ideaType";

type Props = {
    idea: IdeaType,
    mode: 'add' | 'edit'
}

const ManageIdea = (props: Props) => {
    const [id, setId] = useState<number | undefined>(undefined);
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [addIdea] = useAddIdeaMutation();
    const [deleteIdea] = useDeleteIdeaMutation();
    const [updateIdea] = useUpdateIdeaMutation();
    const toast = toastUtils();

    useEffect(() => {
        if (props.idea) {
            setId(props.idea.id);
            setName(props.idea.name);
            setUrl(props.idea.url);
        }
    }, [props.idea]);

    const addIdeaHandler = async () => {
        try {
            await addIdea({name, url}).unwrap();
            setName('');
            setUrl('');
        } catch (err) {
            toast.error('Failed to add Idea: ' + err);
        }
    }

    const updateIdeaHandler = async () => {
        try {
            await updateIdea({id, name, url}).unwrap();
        } catch (err) {
            toast.error('Failed to update Idea: ' + err);
        }
    }

    const deleteIdeaHandler = async () => {
        try {
            await deleteIdea(id);
            toast.success("Deleted Idea");
        } catch (err) {
            toast.error('Failed to delete Idea: ' + err);
        }
    }

    return (
        <section>
            {props.mode === 'add' && <h2>Add Idea</h2>}
            <label htmlFor="name">Name:</label><br/>
            <input type="text" name="name" value={name} onChange={e => setName(e.target.value)}/><br/>
            <label htmlFor="url">Url:</label><br/>
            <input type="text" name="url" value={url}
                   onChange={e => setUrl(e.target.value)}/><br/>

            {props.mode === 'add' &&
                <Button type="button" onClick={() => addIdeaHandler()}>Add Idea</Button>
            }
            {props.mode !== 'add' &&
                <Button type="button" onClick={() => updateIdeaHandler()}>Update Idea</Button>
            }
            {props.mode !== 'add' &&
                <Button type="button" onClick={() => deleteIdeaHandler()}>Delete</Button>
            }
        </section>
    );
};

export default ManageIdea;