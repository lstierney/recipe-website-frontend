import React from 'react';
import classes from "../../main.module.css";
import MethodStepsList from "./MethodStepsList";
import {useRouteLoaderData} from "react-router-dom";
import _ from 'lodash';
import MethodStepInput from "../admin/MethodStepInput";

const Method = (props) => {
    const isAdmin = !_.isEmpty(useRouteLoaderData('root'));

    return (
        <section>
            <br/>
            <h2 className={classes.left_align}>Method</h2>
            <MethodStepsList methodSteps={props.methodSteps}/>
            {isAdmin && <MethodStepInput onAdd={props.onAdd}/>}
        </section>
    );
};

export default Method;