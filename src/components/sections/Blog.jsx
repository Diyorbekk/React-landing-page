import React, {Component} from "react";
import slider_1 from '../../assets/img/slider/1.jpg'
import slider_2 from '../../assets/img/slider/2.jpg'
import slider_3 from '../../assets/img/slider/3.jpg'
import slider_4 from '../../assets/img/slider/4.jpg'
import {Link} from "react-router-dom";


class Blog extends Component {
    render() {
        return (
            <section id="blog" className="bauen-blog section-padding" data-scroll-index="4">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2 className="section-title">Current <span>News</span></h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="owl-carousel owl-theme">
                                <div className="item">
                                    <div className="position-re o-hidden">
                                        <img src={slider_1} alt="slider"/>
                                    </div>
                                    <div className="con">
                                    <span className="category">
                                        <Link to="blog.html">Architecture </Link> -  20.12.2021
                                    </span>
                                        <h5>
                                            <Link to="post.html">Modern Architectural Structures</Link>
                                        </h5>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="position-re o-hidden">
                                        <img src={slider_2} alt="slider"/></div>
                                    <div className="con"> <span className="category">
                                        <Link to="blog.html">Interior</Link> - 18.12.2021
                                    </span>
                                        <h5>
                                            <Link to="post.html">Modernism in Architecture</Link>
                                        </h5>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="position-re o-hidden">
                                        <img src={slider_3} alt="slider"/>
                                    </div>
                                    <div className="con"> <span className="category">
                                        <Link to="blog.html">Urban</Link> - 16.12.2021
                                    </span>
                                        <h5>
                                            <Link to="post.html">Postmodern Architecture</Link>
                                        </h5>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="position-re o-hidden">
                                        <img src={slider_4} alt=""/>
                                    </div>
                                    <div className="con">
                                        <span className="category">
                                    <Link to="blog.html">Planing</Link> - 14.12.2021
                                </span>
                                        <h5>
                                            <Link to="post.html">Modern Architecture Buildings</Link>
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Blog;
