import React, {useEffect, useState} from 'react';
import _ from 'lodash';
import classes from '../../main.module.css';
import {Reorder} from "framer-motion";
import {isAdminUser} from "../../utils/auth";

const MethodStepsList = (props) => {
    const isAdmin = isAdminUser();
    const [methodSteps, setMethodSteps] = useState(props.methodSteps);

    useEffect(() => {
        setMethodSteps(props.methodSteps);
    }, [props.methodSteps]);

    return (
        <Reorder.Group axis="y" values={methodSteps}
                       onReorder={setMethodSteps}>
            {!_.isEmpty(methodSteps) && methodSteps.map((methodStep, index) => (
                <Reorder.Item key={methodStep.id} value={methodStep}>
                    <div className={classes.method_step} onMouseUp={() => {
                        props.onReorder(methodSteps)
                    }}>
                        <span className={classes.step}>STEP {index + 1}</span><br/>{methodStep.description}&nbsp;
                        {isAdmin &&
                            <button type="button"
                                    onClick={() => {
                                        props.onRemove(methodStep.description)
                                    }}>Remove</button>}
                    </div>
                </Reorder.Item>))}
            {_.isEmpty(methodSteps) && <p>No Method Steps found</p>}
        </Reorder.Group>
    );
};

export default MethodStepsList;