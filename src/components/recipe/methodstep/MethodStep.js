import React from 'react';
import classes from './MethodStep.module.css';

const MethodStep = props => {
    const {methodStep} = props;
    return (
        <>
            <span className={classes['step-number']}>STEP {props.number}</span><br/>
            <span>{methodStep.description}</span>
        </>
    );
};

export default MethodStep;