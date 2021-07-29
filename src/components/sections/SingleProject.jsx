import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import {fetchProjectCatalogById, fetchProjectsCatalog} from "../../store/actions/project";
import {connect} from "react-redux";
import Loader from "../UI/Loader/Loader";
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

// Projects

class SingleProject extends Component {
    componentDidMount() {
        this.props.fetchProjectsCatalog()
        this.props.fetchProjectCatalogById()

    }

    render() {

        const link = this.props.categoryUrl.map((projectsUrl) => {
            return projectsUrl.id
        })
        SwiperCore.use([Pagination, Navigation, Lazy, Autoplay]);
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

                            {
                                this.props.loading || this.props.categoryList.length === 0
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
                                            this.props.categoryList.map((projectsList, index) => {
                                                return (
                                                    <SwiperSlide key={index}>
                                                        <div className="item swiper-lazy">
                                                            <NavLink to={"/project/" + link[index]}
                                                                     className="h-100 d-block">
                                                                {
                                                                    projectsList.categoryData.map((listCategory, number) => {
                                                                        return (
                                                                            <React.Fragment key={number}>
                                                                                <div className="position-re o-hidden h-100">
                                                                                    <img src={listCategory.projectImgUrl[0]}
                                                                                         alt={listCategory.projectImgUrl[0]}
                                                                                         loading={"lazy"}/>
                                                                                </div>
                                                                                <div className="con">
                                                                                    <h6>{projectsList.categoryName}</h6>
                                                                                    <h5>{listCategory.projectTitle}</h5>
                                                                                    <div className="line"/>
                                                                                    <i className="ti-arrow-right"/>
                                                                                </div>
                                                                            </React.Fragment>
                                                                        )
                                                                    })
                                                                }
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

        );
    }
}

function mapStateToProps(state) {
    return {
        categoryUrl: state.project.category,
        categoryList: state.project.categoryList,
        loading: state.project.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchProjectsCatalog: () => dispatch(fetchProjectsCatalog()),
        fetchProjectCatalogById: () => dispatch(fetchProjectCatalogById()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProject);
