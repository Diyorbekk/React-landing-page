import React from 'react'
import './InputFileMultiple.scss'

function InputFileMultiple(props) {
    return (
        <fieldset>
            <legend>{props.legend}</legend>

            <label className="__lk-fileInput" htmlFor="images"
                   style={{backgroundImage: `url(${props.file || "https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"})`}}>
                <span data-default='Choose file'>{props.label}
                    {props.size === null ?
                        null
                        : ` (${props.size} mb)`
                    }
                </span>

                {props.errorMessage === null ?
                    null
                    : <span className="text-danger bg-transparent my-0">{props.errorMessage}</span>
                }
                <input type="file" multiple name="images" id="images" required="required" onChange={props.onChange}/>
            </label>


        </fieldset>
    );
}

export default InputFileMultiple