import React, {Component} from "react";
import {Link} from "react-router-dom";
import clients from "../../assets/img/clients/1.png"
import clients_2 from "../../assets/img/clients/2.png"
import clients_3 from "../../assets/img/clients/3.png"
import clients_4 from "../../assets/img/clients/4.png"
import clients_5 from "../../assets/img/clients/5.png"
import clients_6 from "../../assets/img/clients/6.png"

class Clients extends Component {
    render() {
        return (
            <section className="clients">
                <div className="container">
                    <div className="row">
                        <div className="col-md-7 owl-carousel owl-theme">
                            <div className="clients-logo">
                                <Link to="/">
                                    <img src={clients} alt="clients"/>
                                </Link>
                            </div>
                            <div className="clients-logo">
                                <Link to="/">
                                    <img src={clients_2} alt="clients"/>
                                </Link>
                            </div>
                            <div className="clients-logo">
                                <Link to="/">
                                    <img src={clients_3} alt="clients"/>
                                </Link>
                            </div>
                            <div className="clients-logo">
                                <Link to="/">
                                    <img src={clients_4} alt="clients"/>
                                </Link>
                            </div>
                            <div className="clients-logo">
                                <Link to="/">
                                    <img src={clients_5} alt="clients"/>
                                </Link>
                            </div>
                            <div className="clients-logo">
                                <Link to="/">
                                    <img src={clients_6} alt="clients"/>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Clients;
