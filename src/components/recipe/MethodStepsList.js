import React from 'react';

const MethodStepsList = (props) => {
    return (
        <div>
            <ul>
                {props.methodSteps.map(methodStep => <li key={methodStep.ordering}>{methodStep.description}</li>)}
            </ul>
        </div>
    );
};

export default MethodStepsList;