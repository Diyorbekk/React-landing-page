import React, {Component} from "react";
import {Link} from "react-router-dom";
    
class Contact extends Component {
    render() {
        return (
            <section id="contact" className="section-padding" data-scroll-index="5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 animate-box" data-animate-effect="4">
                            <h2 className="section-title">Contact <span>Us</span></h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 mb-30 animate-box" data-animate-effect="4">
                            <p>Our firm nisl sodales sit amet sapien idea placerat sodales orcite. Vivamus ne miss
                                rhoncus felis bauen architecture.</p>
                            <p><b>VAT :</b> USA002323065B06</p>
                        </div>
                        <div className="col-md-4 mb-30 animate-box" data-animate-effect="4">
                            <p><b>Phone :</b> <a href="tel: +998 99 815 60 24"> +1 203-123-0606 </a></p>
                            <p><b>Email :</b> architecture@bauen.com</p>
                            <p><b>Address :</b> 24 King St, Charleston, 29401 USA</p>
                        </div>
                        <div className="col-md-4 animate-box" data-animate-effect="4">
                            <form method="post" className="row">
                                <div className="col-md-12">
                                    <input type="text" name="name" id="name" placeholder="Full Name"/>
                                </div>
                                <div className="col-md-12">
                                    <input type="email" name="email" id="email" placeholder="Your Email" required=""/>
                                </div>
                                <div className="col-md-12">
                                    <textarea name="message" id="message" cols="40" rows="3"
                                              placeholder="Your Message"/>
                                </div>
                                <div className="col-md-12">
                                    <button className="butn-dark mt-15">
                                        <Link to="/"><span>Send</span></Link>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Contact;
