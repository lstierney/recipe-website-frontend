import React, {MouseEventHandler} from 'react';

import './Button.module.css';

type ButtonProps = {
    onClick: MouseEventHandler<HTMLButtonElement>,
    ariaLabel?: string,
    children: React.ReactNode,
    type: "button" | "submit" | "reset" | undefined
}

// TODO - can we get type from a library?

const Button = (props: ButtonProps) => {
    return (
        <button onClick={props.onClick} aria-label={props.ariaLabel} type={props.type}>{props.children}</button>
    );
};

export default Button;