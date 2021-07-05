import React from 'react';
import './CompletedCheck.scss'
import $ from 'jquery';
window.jQuery = $;
window.$ = $;

function CompletedCheck(props) {
    window.$ (".check-icon").hide();
    setTimeout(function () {
        window.$ (".check-icon").show();
    }, 10);

    return (
        <div className="background-success">
            <div className="success-checkmark">
                <div className="check-icon">
                    <span className="icon-line line-tip"/>
                    <span className="icon-line line-long"/>
                    <div className="icon-circle"/>
                    <div className="icon-fix"/>
                </div>
            </div>
        </div>
    );
}

export default CompletedCheck;