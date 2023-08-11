import React from 'react';
import classes from "../../../main.module.css";
import MethodStepInput from "../../admin/MethodStepInput";
import {isInEditingMode} from "../../../utils/auth";
import DraggableList from "../draggablelist/DraggableList";

const Method = (props) => {
    const isEditMode = isInEditingMode();

    return (
        <section>
            <br/>
            <h2 className={classes.left_align}>Method</h2>
            <DraggableList onReorder={props.onReorder} onRemove={props.onRemove} items={props.items}
                           type={'methodSteps'}/>
            {isEditMode && <MethodStepInput onAdd={props.onAdd}/>}
        </section>
    );
};

export default Method;