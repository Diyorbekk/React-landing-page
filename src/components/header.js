import React, {Component} from 'react';
import slider_1 from '../assets/img/slider/1.jpg';
import slider_2 from '../assets/img/slider/2.jpg';

class Header extends Component {
    render() {
        return (
            <header id="home" className="header slider-fade" data-scroll-index="0">
                <div className="owl-carousel owl-theme">
                <div className="text-left item bg-img" data-overlay-dark="3" data-background={slider_1}>
                    <div className="v-bottom caption">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-7">
                                    <div className="o-hidden">
                                        <h1>Innovate Desing in Toronto</h1>
                                        <hr/>
                                            <p>Architecture viverra tellus nec massa dictum the euismoe.
                                                <br/>Curabitur viverra the posuere aukue velit.
                                            </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-left item bg-img" data-overlay-dark="4" data-background={slider_2}>
                    <div className="v-bottom caption">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-7">
                                    <div className="o-hidden">
                                        <h1>Innovate Desing in Canada</h1>
                                        <hr/>
                                            <p>Architecture viverra tellus nec massa dictum the euismoe.
                                                <br/>Curabitur viverra the posuere aukue velit.
                                            </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </header>
    );
    }


    }

    export default Header;