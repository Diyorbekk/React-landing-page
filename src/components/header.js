import React, {Component} from 'react';
import {fetchProjectById, fetchProjects} from "../store/actions/project";
import {connect} from "react-redux";
import Loader from "./UI/Loader/Loader";
import image from "../assets/img/projects/1.jpg"
import $ from 'jquery';
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {
    EffectFade,
    Lazy,
    Autoplay,
    Navigation
} from 'swiper/core';

import "swiper/swiper.min.css";
import "swiper/components/effect-fade/effect-fade.min.css"
import "swiper/components/lazy/lazy.min.css"
import "swiper/components/navigation/navigation.min.css"

window.jQuery = $;
window.$ = $;
const navigation = {
    nextEl: ".owl-next",
    prevEl: ".owl-prev "
};


class Header extends Component {

    componentDidMount() {
        this.props.fetchProjectById()
    }

    sliderStart() {
        window.$(document).ready(function () {
            let item = window.$('.swiper-slide-prev, .swiper-slide-next');
            let owlItem = window.$('.swiper-slide')
            let attr = window.$('.swiper-slide.swiper-slide-duplicate-active')
            let owlItemActive = window.$('.swiper-slide-active,.swiper-slide.swiper-slide-duplicate-active')
            if (owlItem.hasClass("swiper-slide-active") || owlItem.hasClass("swiper-slide-duplicate-active")) {
                window.$(owlItemActive).not('.swiper-slide-duplicate').find('h1').removeClass('d-none animated fadeOutDown');
                window.$(owlItemActive).not('.swiper-slide-duplicate').find('p').removeClass('d-none animated fadeOutDown');
                window.$(owlItemActive).not('.swiper-slide-duplicate').find('.butn-light').removeClass('d-none animated fadeOutDown')
                window.$(owlItemActive).not('.swiper-slide-duplicate').find('h4').removeClass('d-none animated fadeOutDown');
                window.$(owlItemActive).not('.swiper-slide-duplicate').find('h1').addClass('animated fadeInUp');
                window.$(owlItemActive).not('.swiper-slide-duplicate').find('p').addClass('animated fadeInUp');
                window.$(owlItemActive).not('.swiper-slide-duplicate').find('.butn-light').addClass('animated fadeInUp')
                window.$(owlItemActive).not('.swiper-slide-duplicate').find('h4').addClass('animated fadeInUp');
                window.$(attr).find('h1').removeClass('d-none animated fadeOutDown');
                window.$(attr).find('p').removeClass('d-none animated fadeOutDown');
                window.$(attr).find('.butn-light').removeClass('d-none animated fadeOutDown')
                window.$(attr).find('h4').removeClass('d-none animated fadeOutDown')
                window.$(attr).find('h1').addClass('animated fadeInUp');
                window.$(attr).find('p').addClass('animated fadeInUp');
                window.$(attr).find('.butn-light').addClass('animated fadeInUp')
                window.$(attr).find('h4').addClass('animated fadeInUp');
            } else {
                window.$('h4').removeClass('animated fadeInUp');
                window.$('h1').removeClass('animated fadeInUp');
                window.$('p').removeClass('animated fadeInUp');
                window.$('.butn-light').removeClass('animated fadeInUp');
            }
            window.$(item).not('.swiper-slide-duplicate').find('h1').addClass('animated fadeOutDown');
            window.$(item).not('.swiper-slide-duplicate').find('p').addClass('animated fadeOutDown');
            window.$(item).not('.swiper-slide-duplicate').find('.butn-light').addClass('animated fadeOutDown')
            window.$(item).not('.swiper-slide-duplicate').find('h4').addClass('animated fadeOutDown');

        })
    }

    render() {
        SwiperCore.use([EffectFade, Navigation, Lazy, Autoplay]);
        return (
            <header id="home" className="header slider-fade" data-scroll-index="0">
                <div className="header slider-fade">

                    {
                        this.props.loading || this.props.projectList.length === 0
                            ? <Loader/>
                            : <React.Fragment>
                                <Swiper
                                    navigation={navigation}
                                    effect={'fade'}
                                    lazy={true}
                                    loop={true}
                                    autoplay={{
                                        delay: 5000,
                                        disableOnInteraction: false
                                    }}
                                    grabCursor={true}
                                    onSlideChange={() => this.sliderStart()}
                                    className="header-slider">
                                    {this.props.projectList.map((project, index) => {

                                        return (
                                            <SwiperSlide key={index}>
                                                <div className="text-left item bg-img swiper-lazy"
                                                     style={{backgroundImage: `url(${project.projectImgUrl || image})`}}
                                                     data-overlay-dark="3">
                                                    <div className="v-bottom caption">
                                                        <div className="container">
                                                            <div className="row">
                                                                <div className="col-md-7 col-xl-8">
                                                                    <div className="o-hidden">
                                                                        <h1 className="d-none animated fadeInUp">{project.projectTitle}</h1>
                                                                        <hr/>
                                                                        <p className="d-none animated fadeInUp" dangerouslySetInnerHTML={{__html: project.projectText}}/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="swiper-lazy-preloader swiper-lazy-preloader-white"/>
                                            </SwiperSlide>
                                        )
                                    })}
                                </Swiper>
                                <div className="owl-nav">
                                    <div className="owl-prev"><i className="ti-angle-left" aria-hidden="true"/></div>
                                    <div className="owl-next"><i className="ti-angle-right" aria-hidden="true"/></div>
                                </div>
                            </React.Fragment>
                    }

                </div>
            </header>
        );
    }


}

function mapStateToProps(state) {
    return {
        projectsUrl: state.project.projects,
        projectList: state.project.projectList,
        loading: state.project.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchProjects: () => dispatch(fetchProjects()),
        fetchProjectById: () => dispatch(fetchProjectById()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

