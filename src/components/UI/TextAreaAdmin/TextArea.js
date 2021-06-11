import React from 'react'

function isInvalid({valid, touched, shouldValidate}) {
    return !valid && shouldValidate && touched
}


function TextArea(props) {
    const cls = ["form-group"];

    if (isInvalid(props)) {
        cls.push("text-danger")
    }

    return (
        <div className={cls.join(' ')}>
            <label>{props.label}</label>
            <textarea
                className="form-control"
                value={props.value}
                onChange={props.onChange}
                rows={props.row}/>

            {
                isInvalid(props)
                    ? <span>{props.errorMessage || 'To\'g\'ri qiymatni kiriting' }</span> : null
            }
        </div>
    );
}

export default TextArea