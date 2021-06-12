import React from 'react';

function Card(props) {
    return (
        <div className="card">
            <img
                src={props.cardUrl || "https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"}
                className="card-img-top" alt={props.cardUrl}/>
            <div className="card-body">

                <div className="card-body">
                    <h5 className="card-title">{props.cardTitle}</h5>
                    <p className="card-text">{props.cardText}</p>
                    <p className="card-text">
                        <small className="text-muted">Last updated {props.cardDataCreate}</small>
                    </p>
                </div>
            </div>
        </div>
    );
}


export default Card;