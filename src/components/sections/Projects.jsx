import React, {Component} from "react";
import {Link} from "react-router-dom";
import project_1 from '../../assets/img/projects/1.jpg'
import project_2 from '../../assets/img/projects/2.jpg'
import project_3 from '../../assets/img/projects/3.jpg'
import project_4 from '../../assets/img/projects/4.jpg'

class Projects extends Component {
    render() {
        return (
            <section id="projects" className="projects section-padding" data-scroll-index="2">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h2 className="section-title">Our <span>Projects</span></h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="owl-carousel owl-theme">
                                <div className="item">
                                    <div className="position-re o-hidden">
                                        <img src={project_1} alt="Projects"/></div>
                                    <div className="con">
                                        <h6>
                                            <Link to="/Project">Interior</Link>
                                        </h6>
                                        <h5>
                                            <Link to="/Project">Cotton House</Link>
                                        </h5>
                                        <div className="line"/>
                                        <Link to="/Project">
                                            <i className="ti-arrow-right"/>
                                        </Link>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="position-re o-hidden">
                                        <img src={project_2} alt="Projects"/></div>
                                    <div className="con">
                                        <h6>
                                            <Link to="/">Exterior</Link>
                                        </h6>
                                        <h5>
                                            <Link to="/">Armada Center</Link>
                                        </h5>
                                        <div className="line"/>
                                        <Link to="/">
                                            <i className="ti-arrow-right"/>
                                        </Link>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="position-re o-hidden">
                                        <img src={project_3} alt="Projects"/></div>
                                    <div className="con">
                                        <h6>
                                            <Link to="/">Urban</Link>
                                        </h6>
                                        <h5>
                                            <Link to="/">Stonya Villa</Link>
                                        </h5>
                                        <div className="line"/>
                                        <Link to="/">
                                            <i className="ti-arrow-right"/>
                                        </Link>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="position-re o-hidden">
                                        <img src={project_4} alt="Projects"/></div>
                                    <div className="con">
                                        <h6>
                                            <Link to="/">Interior</Link>
                                        </h6>
                                        <h5>
                                            <Link to="/">Prime Hotel</Link>
                                        </h5>
                                        <div className="line"/>
                                        <Link to="/">
                                            <i className="ti-arrow-right"/>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Projects;
