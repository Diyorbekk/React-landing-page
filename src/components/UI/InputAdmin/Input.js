import React from 'react';

function Input(props) {
    const inputType = props.type || 'text';
    const htmFor = `${inputType}-${Math.random()}`
    return (
        <div className="form-group">
            <label htmlFor={htmFor}>{props.label}</label>
            <input
                type={inputType}
                id={htmFor}
                className="form-control box-shadow-none px-2 input-focus border"
                value={props.value}
                onChange={props.onChange}
            />
        </div>
    );
}

export default Input;