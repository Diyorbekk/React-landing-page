import React from 'react'
import './InputFile.scss'
import $ from "jquery"

function InputFile(props) {
    return (
        <fieldset>
            <legend>{props.legend}</legend>

            <label className='__lk-fileInput ' htmlFor="images">

                <img
                    src={props.file || "https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"}
                    className="card-img-top" alt={props.file}/>
                <span data-default='Choose file'>{props.label}</span>
                <input type="file" name="images" id="images" required="required" onChange={props.onChange}/>
            </label>


        </fieldset>
    );
}

export default InputFile