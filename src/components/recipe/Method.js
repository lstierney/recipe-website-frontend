import React from 'react';
import classes from "../../main.module.css";
import MethodStepsList from "./MethodStepsList";
import MethodStepInput from "../admin/MethodStepInput";
import {isAdminUser} from "../../utils/auth";

const Method = (props) => {
    const isAdmin = isAdminUser();

    return (
        <section>
            <br/>
            <h2 className={classes.left_align}>Method</h2>
            <hr/>
            <MethodStepsList onReorder={props.onReorder} onRemove={props.onRemove} methodSteps={props.methodSteps}/>
            {isAdmin && <MethodStepInput onAdd={props.onAdd}/>}
        </section>
    );
};

export default Method;