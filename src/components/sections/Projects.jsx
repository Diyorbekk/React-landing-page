import React, {Component} from "react";
import {Link} from "react-router-dom";
import project_1 from '../../assets/img/projects/1.jpg'
import project_2 from '../../assets/img/projects/2.jpg'
import project_3 from '../../assets/img/projects/3.jpg'
import project_4 from '../../assets/img/projects/4.jpg'


class Projects extends Component {
    render() {
        return (
            <section className="projects section-padding2">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 animate-box">
                            <h2 className="section-title">Our <span>Projects</span></h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 animate-box">
                            <div className="item">
                                <div className="position-re o-hidden">
                                    <img src={project_1} alt={project_1}/>
                                </div>
                                <div className="con">
                                    <h6><Link to="cotton-house.html">Interior</Link></h6>
                                    <h5><Link to="cotton-house.html">Cotton House</Link></h5>
                                    <div className="line"/>
                                    <Link to="cotton-house.html"><i className="ti-arrow-right"/></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 animate-box">
                            <div className="item">
                                <div className="position-re o-hidden"><img src={project_2} alt={project_2}/></div>
                                <div className="con">
                                    <h6><Link to="armada-center.html">Exterior</Link></h6>
                                    <h5><Link to="armada-center.html">Armada Center</Link></h5>
                                    <div className="line"/>
                                    <Link to="armada-center.html"><i className="ti-arrow-right"/></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 animate-box">
                            <div className="item">
                                <div className="position-re o-hidden"><img src={project_3} alt={project_3}/></div>
                                <div className="con">
                                    <h6><Link to="stonya-villa.html">Urban</Link></h6>
                                    <h5><Link to="stonya-villa.html">Stonya Villa</Link></h5>
                                    <div className="line"/>
                                    <Link to="stonya-villa.html"><i className="ti-arrow-right"/></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 animate-box">
                            <div className="item">
                                <div className="position-re o-hidden"><img src={project_4} alt={project_4}/></div>
                                <div className="con">
                                    <h6><Link to="prime-hotel.html">Interior</Link></h6>
                                    <h5><Link to="prime-hotel.html">Prime Hotel</Link></h5>
                                    <div className="line"/>
                                    <Link to="prime-hotel.html"><i className="ti-arrow-right"/></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Projects;
