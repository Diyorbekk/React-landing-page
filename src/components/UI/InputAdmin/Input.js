import React from 'react';

function isInvalid({valid, touched, shouldValidate}) {
    return !valid && shouldValidate && touched
}

function Input(props) {
    const cls = ["form-group"];

    if (isInvalid(props)) {
        cls.push("text-danger")
    }


    const inputType = props.type || 'text';
    const htmFor = `${inputType}-${Math.random()}`
    return (
        <div className={cls.join(' ')} >
            <label htmlFor={htmFor}>{props.label}</label>
            <input
                type={inputType}
                id={htmFor}
                className="form-control box-shadow-none px-2 input-focus border"
                value={props.value}
                onChange={props.onChange}
            />
            {
                isInvalid(props)
                    ? <span>{props.errorMessage || 'To\'g\'ri qiymatni kiriting' }</span> : null
            }
        </div>
    );
}

export default Input;