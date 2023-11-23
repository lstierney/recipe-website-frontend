import React, {useEffect, useRef, useState} from 'react';
import Button from "../../button/Button";

type Props = {
    onAdd(description: string): void;
    onUpdate(originalDescription: string, newDescription: string): void;
    value?: string;
    type: string;
}

const MethodStepAndNoteInput: React.FC<Props> = props => {
    const [description, setDescription] = useState(props.value || '');
    const originalDescription = props.value || '';
    const [isUpdate, setIsUpdate] = useState(false);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (props.value !== undefined) {
            setDescription(props.value);
            setIsUpdate(true);
        }
    }, [props.value]);

    const onAdd = () => {
        props.onAdd(description);

        if (!isUpdate) {
            setDescription('');
            if (textAreaRef.current !== null) {
                textAreaRef.current.focus();
            }
        }
    }

    const onUpdate = () => {
        props.onUpdate(originalDescription, description);
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    };

    return (
        <div>
            <textarea
                ref={textAreaRef}
                cols={60}
                onChange={handleChange}
                name={props.type}
                value={description}
            />
            {!isUpdate && <Button type="button" onClick={onAdd}>Add</Button>}
            {isUpdate && <Button type="button" onClick={onUpdate}>Update</Button>}
        </div>
    );
};
export default MethodStepAndNoteInput;
