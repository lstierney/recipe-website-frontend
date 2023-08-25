import React from 'react';
import classes from './MethodStep.module.css';
import {MethodStepType} from "../../../types/methodStepType";

type Props = {
    methodStep: MethodStepType,
    number: number
}

const MethodStep = (props: Props) => {
    const {methodStep} = props;
    return (
        <>
            <span className={classes['step-number']}>STEP {props.number}</span><br/>
            <span>{methodStep.description}</span>
        </>
    );
};

export default MethodStep;