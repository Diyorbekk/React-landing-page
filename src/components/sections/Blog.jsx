import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import Loader from "../UI/Loader/Loader";
import {connect} from "react-redux";
import {fetchNews} from "../../store/actions/project";
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {
    Pagination,
    Lazy,
    Autoplay,
    Navigation
} from 'swiper/core';

import "swiper/swiper.min.css";
import "swiper/components/lazy/lazy.min.css"
import "swiper/components/navigation/navigation.min.css"
import "swiper/components/pagination/pagination.min.css"

class Blog extends Component {
    componentDidMount() {
        this.props.fetchNews()
    }

    render() {
        SwiperCore.use([Pagination, Navigation, Lazy, Autoplay]);

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
                            {
                                this.props.loading || this.props.newsList.length === 0
                                    ? <Loader/>
                                    : <Swiper
                                        autoplay={{
                                            delay: 5000,
                                            disableOnInteraction: false
                                        }}
                                        lazy={true}
                                        spaceBetween={30}
                                        grabCursor={true}
                                        pagination={true}
                                        slidesPerView={2} breakpoints={{
                                        "0": {
                                            "slidesPerView": 1,
                                        },
                                        "600": {
                                            "slidesPerView": 2,
                                        },
                                        "1000": {
                                            "slidesPerView": 2,
                                        }
                                    }} className="project-slider">
                                        {
                                            this.props.newsList.map((newsList, index) => {
                                                return (
                                                    <SwiperSlide key={index}>
                                                        <div className="item swiper-lazy" key={index}>
                                                            <NavLink to={"/news/" + newsList.path}
                                                                     className="h-100 d-block">
                                                                <div className="position-re o-hidden h-100">
                                                                    <img src={newsList.data.projectImgUrl} alt="slider"/>
                                                                </div>
                                                                <div className="con">
                                                                <span className="category">
                                                                    <span>{newsList.data.categoryName} </span> - {newsList.data.createData}
                                                                </span>
                                                                    <h5 className="two-line-text">
                                                                        <span>{newsList.data.projectTitle}</span>
                                                                    </h5>
                                                                </div>
                                                            </NavLink>
                                                        </div>
                                                        <div className="swiper-lazy-preloader swiper-lazy-preloader-white"/>
                                                    </SwiperSlide>
                                                )
                                            })
                                        }
                                    </Swiper>

                            }
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        newsList: state.project.news,
        loading: state.project.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchNews: () => dispatch(fetchNews()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
