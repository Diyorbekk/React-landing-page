import React from 'react'

function TextArea(props) {

    return (
        <div className="form-group">
            <label>{props.label}</label>
            <textarea className="form-control" rows={props.row}/>
        </div>
    );
}

export default TextArea