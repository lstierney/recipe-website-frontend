import React from 'react';

import './Button.module.css';

const Button = props => {
    return (
        <button onClick={props.onClick} aria-label={props.ariaLabel} type={props.type}>{props.children}</button>
    );
};

export default Button;