import React, {Component} from 'react';
import about from '../../assets/img/about.jpg'

class About extends Component {
    render() {
        return (
            <section id="about" className="about section-padding" data-scroll-index="1">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 mb-30 animate-box" data-animate-effect="fadeInUp">
                            <h2 className="section-title">About <span>Bauen</span></h2>
                            <p>Architecture viverra tristique justo duis vitae diam neque nivamus aestan ateuene artines
                                aringianu atelit finibus viverra nec lacus. Nedana theme erodino setlie suscipe no
                                curabit tristique.</p>
                            <p>Design inilla duiman at elit finibus viverra nec a lacus themo the drudea seneoice
                                misuscipit non sagie the fermen.</p>
                            <p>Planner inilla duiman at elit finibus viverra nec a lacus themo the drudea seneoice
                                misuscipit non sagie the fermen. Viverra tristique jusio the ivite dianne onen nivami
                                acsestion augue artine.</p>
                        </div>
                        <div className="col-md-6 animate-box" data-animate-effect="fadeInUp">
                            <div className="about-img">
                                <div className="img">
                                    <img src={about} className="img-fluid" alt=""/>
                                </div>
                                <div className="about-img-2 about-buro">Canada Office</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default About;