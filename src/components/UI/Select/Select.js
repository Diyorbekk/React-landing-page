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
                multiple={false}
            >
                {props.options.map((option, index) => {
                    return (
                        <React.Fragment key={index}>
                            {
                                index === 0
                                    ? <option hidden selected>{props.placeholder}</option>
                                    : <option
                                        value={option.value}
                                        key={option.value + index}
                                    >
                                        {option.text}
                                    </option>

                            }
                        </React.Fragment>

                    )
                })}
            </select>
        </div>
    );
}

export default Select;