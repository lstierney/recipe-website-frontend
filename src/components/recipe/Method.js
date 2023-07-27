import React from 'react';
import classes from "../../main.module.css";
import MethodStepInput from "../admin/MethodStepInput";
import {isAdminUser} from "../../utils/auth";
import DraggableList from "./draggablelist/DraggableList";

const Method = (props) => {
    const isAdmin = isAdminUser();

    return (
        <section>
            <br/>
            <h2 className={classes.left_align}>Method</h2>
            <DraggableList onReorder={props.onReorder} onRemove={props.onRemove} items={props.items}
                           type={'methodSteps'}/>
            {isAdmin && <MethodStepInput onAdd={props.onAdd}/>}
        </section>
    );
};

export default Method;