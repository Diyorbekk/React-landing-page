import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import add from "../../../../assets/img/icons/add.png";


class NewsPanel extends Component {
    render() {
        return (
            <div>
                <h1>News Projects</h1>

                <div className="row">
                    <div className="col-md-4 mt-4">
                        <NavLink to={"/news-add"}
                                 className="border rounded d-flex align-items-center justify-content-center pl-2 pt-2">
                            <img src={add} style={{width: 150}} alt="icon-add"/>
                        </NavLink>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsPanel;
