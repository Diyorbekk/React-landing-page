import React, {Component} from "react";
import {Link} from "react-router-dom";
    
class Footer extends Component {
    render() {
        return (
            <footer className="main-footer dark">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 mb-30">
                            <div className="item fotcont">
                                <div className="fothead">
                                    <h6>Phone</h6>
                                </div>
                                <p>+1 203-123-0606</p>
                            </div>
                        </div>
                        <div className="col-md-4 mb-30">
                            <div className="item fotcont">
                                <div className="fothead">
                                    <h6>Email</h6>
                                </div>
                                <p>architecture@bauen.com</p>
                            </div>
                        </div>
                        <div className="col-md-4 mb-30">
                            <div className="item fotcont">
                                <div className="fothead">
                                    <h6>Our Address</h6>
                                </div>
                                <p>24 King St, Charleston, SC 29401 USA</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sub-footer">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="text-left">
                                    <p>© 2021 Bauen. All right reserved.</p>
                                </div>
                            </div>
                            <div className="col-md-4 abot">
                                <div className="social-icon d-block">
                                    <Link to="/">
                                        <i className="ti-facebook"/>
                                    </Link>
                                    <Link to="/">
                                        <i className="ti-twitter"/>
                                    </Link>
                                    <Link to="/">
                                        <i className="ti-instagram"/>
                                    </Link>
                                    <Link to="/">
                                        <i className="ti-pinterest"/>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <p className="right"><span>Terms &amp; Conditions</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer;
