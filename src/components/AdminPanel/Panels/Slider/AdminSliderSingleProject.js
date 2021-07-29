import React, {Component} from "react";
import {connect} from "react-redux";
import {fetchProjectByUrl} from "../../../../store/actions/project";
import Loader from "../../../UI/Loader/Loader";
import $ from 'jquery';
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {Autoplay, EffectFade, Lazy, Navigation} from "swiper";
window.jQuery = $;
window.$ = $;

const navigation = {
    nextEl: ".owl-next",
    prevEl: ".owl-prev "
};
class AdminSliderSingleProject extends Component {

    componentDidMount() {
        const str = this.props.match.params.id;
        this.props.fetchProjectByUrl("-" + str)

        window.$(document).ready(function () {
            let owlItem = window.$('.swiper-slide')
            window.$(owlItem).not('.swiper-slide-duplicate').find('h1').addClass('d-none');
            window.$(owlItem).not('.swiper-slide-duplicate').find('p').addClass('d-none');
            window.$(owlItem).not('.swiper-slide-duplicate').find('.butn-light').addClass('d-none');
            window.$(owlItem).not('.swiper-slide-duplicate').find('h4').addClass('d-none');
        })
    }

    sliderStart() {
        window.$(document).ready(function () {
            let item = window.$('.swiper-slide-prev, .swiper-slide-next');
            let owlItem = window.$('.swiper-slide')
            window.$(owlItem).not('.swiper-slide-duplicate').find('h1').addClass('d-none');
            window.$(owlItem).not('.swiper-slide-duplicate').find('p').addClass('d-none');
            window.$(owlItem).not('.swiper-slide-duplicate').find('.butn-light').addClass('d-none')
            window.$(owlItem).not('.swiper-slide-duplicate').find('h4').addClass('d-none');
            let owlItemActive = window.$('.swiper-slide-active, .swiper-slide-duplicate-active')
            let owlItemClone = window.$('.swiper-slide.swiper-slide-duplicate')
            if (owlItem.hasClass("swiper-slide-active") || owlItemClone.hasClass("swiper-slide-active")) {
                window.$(owlItemActive).not('.swiper-slide-duplicate').find('h1').removeClass('d-none animated fadeOutDown');
                window.$(owlItemActive).not('.swiper-slide-duplicate').find('p').removeClass('d-none animated fadeOutDown');
                window.$(owlItemActive).not('.swiper-slide-duplicate').find('.butn-light').removeClass('d-none animated fadeOutDown')
                window.$(owlItemActive).not('.swiper-slide-duplicate').find('h4').removeClass('d-none animated fadeOutDown');
                window.$(owlItemActive).not('.swiper-slide-duplicate').find('h1').addClass('animated fadeInUp');
                window.$(owlItemActive).not('.swiper-slide-duplicate').find('p').addClass('animated fadeInUp');
                window.$(owlItemActive).not('.swiper-slide-duplicate').find('.butn-light').addClass('animated fadeInUp')
                window.$(owlItemActive).not('.swiper-slide-duplicate').find('h4').addClass('animated fadeInUp');
            } else {
                window.$('h4').removeClass('animated fadeInUp');
                window.$('h1').removeClass('animated fadeInUp');
                window.$('p').removeClass('animated fadeInUp');
                window.$('.butn-light').removeClass('animated fadeInUp');
            }
            window.$(item).not('.swiper-slide-duplicate').find('h1').addClass('d-none animated fadeOutDown');
            window.$(item).not('.swiper-slide-duplicate').find('p').addClass('d-none animated fadeOutDown');
            window.$(item).not('.swiper-slide-duplicate').find('.butn-light').addClass('d-none animated fadeOutDown')
            window.$(item).not('.swiper-slide-duplicate').find('h4').addClass('d-none animated fadeOutDown');

        })
    }

    render() {
        SwiperCore.use([EffectFade, Navigation, Lazy, Autoplay]);


        return (
            <React.Fragment>
                {
                    this.props.loading || !this.props.project
                        ? <Loader/>
                        : this.props.project.map((project, index) => {
                            return (
                                <div className="header slider-fade" key={index}>
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
                                        {project.projectImgUrl.map((projectBg, index) => {
                                            return (
                                                <SwiperSlide key={index}>
                                                <div className="text-left item bg-img swiper-lazy" data-overlay-dark="3"
                                                         style={{backgroundImage: `url(${projectBg})`}}>
                                                <div className="v-bottom caption">
                                                    <div className="container">
                                                        <div className="row">
                                                            <div className="col-md-7">
                                                                <div className="o-hidden">
                                                                    <h1>{project.projectTitle}</h1>
                                                                    <hr/>
                                                                    <p dangerouslySetInnerHTML={{__html: project.projectText}}/>
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
                                </div>
                            )
                        })
                }
            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        project: state.project.projectSingle,
        loading: state.project.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchProjectByUrl: id => dispatch(fetchProjectByUrl(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminSliderSingleProject);
