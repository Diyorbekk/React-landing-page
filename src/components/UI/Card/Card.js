import React from 'react';

function Card(props) {
    return (
        <div className="card">
            <img
                src={props.cardUrl || "https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"}
                className="card-img-top" alt={props.cardUrl}/>
            <div className="card-body">

                <div className="card-body">
                    <h5 className="card-title two-line-text">{props.cardCategory}</h5>
                    <h4 className="card-title two-line-text">{props.cardTitle}</h4>
                    <p className="card-text four-line-text" dangerouslySetInnerHTML={{__html: props.cardText}}/>
                </div>
            </div>
            <div className="card-footer">
                <div className="px-md-4">
                <small className="text-muted">Last updated {props.cardDataCreate}</small>
                </div>
            </div>
        </div>
    );
}


export default Card;