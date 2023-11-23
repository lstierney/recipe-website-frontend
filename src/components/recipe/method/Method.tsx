import React from 'react';
import classes from "../../../main.module.css";
import MethodStepAndNoteInput from "../../admin/inputs/MethodStepAndNoteInput";
import {isInEditingMode} from "../../../utils/auth";
import DraggableList from "../draggablelist/DraggableList";
import {MethodStepType} from "../../../types/methodStepType";
import {OrderableType} from "../../../types/orderableType";

type Props = {
    items: OrderableType[],
    onRemove: (methodStepDescription: string) => void,
    onReorder: (methodSteps: MethodStepType[]) => void,
    onAdd: (methodStepDescription: string) => void,
    onUpdate: (originalDescription: string, newDescription: string) => void
}

const Method = (props: Props) => {
    const isEditMode = isInEditingMode();

    return (
        <section>
            <br/>
            <h2 className={classes.left_align}>Method</h2>
            <DraggableList
                onUpdate={props.onUpdate}
                onReorder={props.onReorder}
                onIngredientUpdate={() => {
                }}
                onRemove={props.onRemove}
                items={props.items}
                type={'methodSteps'}
            />
            {isEditMode && <MethodStepAndNoteInput type={'methodSteps'} onAdd={props.onAdd} onUpdate={props.onUpdate}/>}
        </section>
    );
};

export default Method;