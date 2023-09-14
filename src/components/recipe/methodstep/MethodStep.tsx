import React from 'react';
import classes from './MethodStep.module.css';
import {MethodStepType} from "../../../types/methodStepType";
import RecipeLinkParser from "../recipeLinkParser/RecipeLinkParser";

type Props = {
    methodStep: MethodStepType,
    number: number
}

const MethodStep = (props: Props) => {
    const {methodStep} = props;
    return (
        <>
            <span className={classes['step-number']}>STEP {props.number}</span><br/>
            <span><RecipeLinkParser>{methodStep.description}</RecipeLinkParser></span>
        </>
    );
};

export default MethodStep;