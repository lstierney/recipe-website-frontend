import React from 'react';
import classes from './MethodStep.module.css';

const MethodStep = props => {
    const {methodStep} = props;
    return (
        <div className={classes['method-step']}>
            <span className={classes['step-number']}>STEP {props.number}</span>
            <span>{methodStep.description}</span>
        </div>
    );
};

export default MethodStep;