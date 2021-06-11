import React from 'react'
import classes from './MenuToggle.module.css'

function MenuToggle(props) {
    const cls = [
        classes.MenuToggle

    ];
    if (props.isOpen) {
        cls.push('ti-close');
        cls.push(classes.open)
    }
    else {
        cls.push('ti-menu')
    }

    return(
        <i
            className={cls.join(' ')}
            onClick={props.onToggle}

        />
    )

}

export default MenuToggle

