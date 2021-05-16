import React, {Component} from "react";
import {Link} from "react-router-dom";
import icon_1 from '../../assets/img/icons/icon-1.png'
import icon_2 from '../../assets/img/icons/icon-2.png'
import icon_3 from '../../assets/img/icons/icon-3.png'

class Services extends Component {
    render() {
        return (
            <section id="services" className="services section-padding" data-scroll-index="3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2 className="section-title">Our <span>Services</span></h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="item">
                                <Link to="architecture.html">
                                    <img src={icon_1} alt="icons"/>
                                    <h5>Architecture</h5>
                                    <div className="line"/>
                                    <p>Architecture bibendum eros eget lacus the vulputate sit amet vehicuta nibhen
                                        ulicera in the vitae miss.</p>
                                    <div className="numb">01</div>
                                </Link>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="item">
                                <Link to="interior-design.html">
                                    <img src={icon_2} alt="icons"/>
                                    <h5>Interior Design</h5>
                                    <div className="line"/>
                                    <p>Architecture bibendum eros eget lacus the vulputate sit amet vehicuta nibhen
                                        ulicera in the vitae miss.</p>
                                    <div className="numb">02</div>
                                </Link>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="item">
                                <Link to="urban-design.html">
                                    <img src={icon_3} alt="icons"/>
                                    <h5>Urban Design</h5>
                                    <div className="line"/>
                                    <p>Architecture bibendum eros eget lacus the vulputate sit amet vehicuta nibhen
                                        ulicera in the vitae miss.</p>
                                    <div className="numb">03</div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Services;
