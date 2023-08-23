import React, {useRef, useState} from 'react';
import Button from "../button/Button";

type Props = {
    onAdd(description: string): void;
}

const MethodStepInput: React.FC<Props> = props => {
    const [description, setDescription] = useState('');
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const onAdd = () => {
        props.onAdd(description);

        if (textAreaRef.current !== null) {
            textAreaRef.current.value = '';
            textAreaRef.current.focus();
        }

    }

    return (
        <div>
            <textarea ref={textAreaRef} cols={60} onChange={e => setDescription(e.target.value)} name="methodStep"/>
            <Button type="button" onClick={onAdd}>Add</Button>
        </div>
    );
};

export default MethodStepInput;