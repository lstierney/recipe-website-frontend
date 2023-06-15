import React from 'react';
import _ from 'lodash';

const MethodStepsList = (props) => {
    return (
        <div>
            <ul>
                {!_.isEmpty(props.methodSteps) && props.methodSteps.map(methodStep => <li
                    key={methodStep.ordering}>{methodStep.description}</li>)}
                {_.isEmpty(props.methodSteps) && <p>No Method Steps found</p>}
            </ul>
        </div>
    );
};

export default MethodStepsList;