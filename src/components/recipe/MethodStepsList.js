import React from 'react';
import _ from 'lodash';
import classes from '../../main.module.css';

const MethodStepsList = (props) => {
    return (
        <div>
            <ul>
                {!_.isEmpty(props.methodSteps) && props.methodSteps.map((methodStep, index) =>
                    <li className={classes.method_step}
                        key={methodStep.ordering}>
                        <span className={classes.step}>STEP {index + 1}</span><br/>{methodStep.description}<br/><br/>
                    </li>)}
                {_.isEmpty(props.methodSteps) && <p>No Method Steps found</p>}
            </ul>
        </div>
    );
};

export default MethodStepsList;