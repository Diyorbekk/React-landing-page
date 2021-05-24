import React from 'react';

function isInvalid({valid, touched, shouldValidate}) {
    return !valid && shouldValidate && touched
}

function Input(props) {
    const inputType = props.type || 'text';
    const htmFor = `${inputType}-${Math.random()}`;
    const cls = ['appform-group'];

    if (isInvalid(props)) {
        cls.push('invalid')
    }

    return (
        <div className={cls.join(' ')}>
            <label htmlFor={htmFor}>{props.label}</label>
            <input
                type={inputType}
                id={htmFor}
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