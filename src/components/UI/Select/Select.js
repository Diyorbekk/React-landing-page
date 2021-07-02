import React from 'react';
import classes from './Select.module.css'

function Select(props) {
    const htmlFor = `${props.label}-${Math.random()}`;

    return (
        <div className={classes.Select}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <select
                id={htmlFor}
                value={props.value}
                onChange={props.onChange}
            >
                {props.options.map((option, index) => {
                    return (
                        <option
                            hidden={index === 0}
                            disabled={index === 0}
                            value={option.value}
                            key={option.value + index}
                        >
                            {option.text}
                        </option>

                    )
                })}
            </select>
            {props.errorMessage === null ?
                <span id="error-select" className="text-danger bg-transparent my-0">{props.errorMessage}</span>
                : <span id="error-select" className="text-danger bg-transparent my-0">{props.errorMessage}</span>
            }
        </div>
    );
}

export default Select;