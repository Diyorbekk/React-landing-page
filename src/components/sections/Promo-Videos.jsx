import React, {useState} from "react";
import OwlCarousel from 'react-owl-carousel2';
import quot from '../../assets/img/quot.png'
import team_1 from '../../assets/img/team/1.jpg'
import team_2 from '../../assets/img/team/2.jpg'
import team_3 from '../../assets/img/team/3.jpg'
import team_4 from '../../assets/img/team/4.jpg'
import ModalVideo from 'react-modal-video'
import 'react-modal-video/css/modal-video.min.css';

const PromoVideos = () => {
    const [isOpen, setOpen] = useState(false)


    const options = {
        loop: true,
        margin: 30,
        mouseDrag: true,
        autoplay: false,
        dots: true,
        nav: false,
        navText: ["<span class='lnr ti-angle-left'></span>", "<span class='lnr ti-angle-right'></span>"],
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    }
    return (
        <section className="testimonials">
            <div className="background bg-img bg-fixed section-padding pb-0" data-background="img/banner2.jpg"
                 data-overlay-dark="3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="vid-area">
                                <div className="vid-icon">
                                    <ModalVideo channel='custom' autoplay isOpen={isOpen} url="https://player.vimeo.com/video/537816640?title=0&portrait=0&byline=0&autoplay=1"
                                                onClose={() => setOpen(false)}/>

                                    <p className="play-button" onClick={() => setOpen(true)}>
                                        <svg className="circle-fill">
                                            <circle cx="43" cy="43" r="39" stroke="#fff" strokeWidth=".5"/>
                                        </svg>
                                        <svg className="circle-track">
                                            <circle cx="43" cy="43" r="39" stroke="none" strokeWidth="1"
                                                    fill="none"/>
                                        </svg>
                                        <span className="polygon">
                                                    <i className="ti-control-play"/>
                                                </span>
                                    </p>


                                </div>
                                <div className="cont mt-25 mb-30">
                                    <h5>View promo video</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5 offset-md-1">
                            <div className="testimonials-box animate-box" data-animate-effect="5">
                                <div className="head-box">
                                    <h4>What Client's Say?</h4>
                                </div>
                                <OwlCarousel clasname="owl-carousel owl-theme" options={options}>
                                    <div className="item">
                                            <span className="quote">
                                            <img src={quot} alt="quot"/>
                                            </span>
                                        <p>Architect dapibus augue metus the nec feugiat erat hendrerit nec. Duis ve
                                            ante the lemon sanleo nec feugiat erat hendrerit necuis ve ante.</p>
                                        <div className="info">
                                            <div className="author-img">
                                                <img src={team_1} alt="teams"/>
                                            </div>
                                            <div className="cont">
                                                <h6>Jason Brown</h6> <span>Crowne Plaza Owner</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                            <span className="quote">
                                            <img src={quot} alt="quot"/>
                                        </span>
                                        <p>Interior dapibus augue metus the nec feugiat erat hendrerit nec. Duis ve
                                            ante the lemon sanleo nec feugiat erat hendrerit necuis ve ante.</p>
                                        <div className="info">
                                            <div className="author-img">
                                                <img src={team_2} alt="teams"/>
                                            </div>
                                            <div className="cont">
                                                <h6>Emily White</h6> <span>Armada Owner</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                            <span className="quote">
                                            <img src={quot} alt="quot"/>
                                        </span>
                                        <p>Urban dapibus augue metus the nec feugiat erat hendrerit nec. Duis ve
                                            ante the lemon sanleo nec feugiat erat hendrerit necuis ve ante.</p>
                                        <div className="info">
                                            <div className="author-img">
                                                <img src={team_3} alt="teams"/>
                                            </div>
                                            <div className="cont">
                                                <h6>Jesica Smith</h6> <span>Alsa Manager</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                            <span className="quote">
                                            <img src={quot} alt="quot"/>
                                        </span>
                                        <p>Urban dapibus augue metus the nec feugiat erat hendrerit nec. Duis ve
                                            ante the lemon sanleo nec feugiat erat hendrerit necuis ve ante.</p>
                                        <div className="info">
                                            <div className="author-img">
                                                <img src={team_4} alt="teams"/>
                                            </div>
                                            <div className="cont">
                                                <h6>Alisa Smith</h6> <span>Alsa Manager</span>
                                            </div>
                                        </div>
                                    </div>
                                </OwlCarousel>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}



export default PromoVideos;
