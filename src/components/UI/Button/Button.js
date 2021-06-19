import React from 'react'
import classes from './Button.module.css'

function Button(props) {
    const cls = [
        classes.Button,
        classes[props.type]
    ];

    return (
        <button
            onClick={props.onClick}
            className={cls.join(' ')}
            disabled={props.disabled}
            hidden={props.hidden}
        >
            {props.children}
        </button>
    )
}

export default Button