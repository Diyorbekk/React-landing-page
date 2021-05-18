import React, {Component} from 'react'
import Banner from '../assets/img/banner.jpg'
import slider_1 from '../assets/img/slider/1.jpg'
import slider_2 from '../assets/img/slider/2.jpg'
import slider_3 from '../assets/img/slider/3.jpg'
import slider_4 from '../assets/img/slider/4.jpg'

class ProjectPage extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="banner-header banner-img valign bg-img bg-fixed" data-overlay-light="3"
                         data-background={Banner}/>

                <div className="section-padding2">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h2 className="section-title2">Prime Hotel</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-8">
                                <p>Architecture non lorem ac erat suscipit bibendum. Nulla facilisi. Sedeuter nunc
                                    volutpat, mollis sapien vel, conseyer turpeutionyer masin libero sempe. Fusceler
                                    mollis augue sit amet hendrerit vestibulum. Duisteyerionyer venenatis lacus.</p>
                                <p>Villa gravida eros ut turpis interdum ornare. Interdum et malesu they adamale fames
                                    ac anteipsu pimsine faucibus. Curabitur arcu site feugiat in tortor in, volutpat
                                    sollicitudin libero.</p>
                            </div>
                            <div className="col-md-4">
                                <p><b>Year : </b> 2021</p>
                                <p><b>Company : </b> Prime International</p>
                                <p><b>Project Name : </b> Prime Hotel</p>
                                <p><b>Location : </b> Toronto, Canada</p>
                            </div>
                        </div>
                        <div className="row mt-30">
                            <div className="col-md-6 gallery-item">
                                <a href={slider_1} title="Architecture" className="img-zoom">
                                    <div className="gallery-box">
                                        <div className="gallery-img">
                                            <img src={slider_1} className="img-fluid mx-auto d-block" alt="work-img"/>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="col-md-6 gallery-item">
                                <a href={slider_2} title="Architecture" className="img-zoom">
                                    <div className="gallery-box">
                                        <div className="gallery-img">
                                            <img src={slider_2} className="img-fluid mx-auto d-block" alt="work-img"/>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="col-md-6 gallery-item">
                                <a href={slider_3} title="Architecture" className="img-zoom">
                                    <div className="gallery-box">
                                        <div className="gallery-img">
                                            <img src={slider_3} className="img-fluid mx-auto d-block" alt="work-img"/>
                                            </div>
                                    </div>
                                </a>
                            </div>
                            <div className="col-md-6 gallery-item">
                                <a href={slider_4} title="Architecture" className="img-zoom">
                                    <div className="gallery-box">
                                        <div className="gallery-img">
                                            <img src={slider_4} className="img-fluid mx-auto d-block" alt="work-img"/></div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="projects-prev-next">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="d-sm-flex align-items-center justify-content-between">
                                    <div className="projects-prev-next-left">
                                        <a href="stonya-villa.html"> <i className="ti-arrow-left"/> Previous Project</a>
                                    </div>
                                    <a href="projects.html"><i className="ti-layout-grid3-alt"/></a>
                                    <div className="projects-prev-next-right">
                                        <a href="cotton-house.html">Next Project <i className="ti-arrow-right"/></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default ProjectPage