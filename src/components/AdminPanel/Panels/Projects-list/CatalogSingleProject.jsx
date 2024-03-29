import React, {Component} from "react";
import Banner from "../../../../assets/img/banner.jpg";
import ContentWrapper from "../../../content-wrapper";
import {fetchProjectCatalogByUrl} from "../../../../store/actions/project";
import {connect} from "react-redux";
import Loader from "../../../UI/Loader/Loader";
import {GalleryItem, LightBoxGallery} from "@sekmet/react-magnific-popup";
import $ from 'jquery';
window.jQuery = $;
window.$ = $;

const config = {
    delegate: 'a',
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    mainClass: 'mfp-fade mfp-img-mobile',
    gallery: {
        enabled: true,
        navigateByImgClick: true,
        preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
        tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
        titleSrc: function (item) {
            return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
        }
    }
}

class CatalogSingleProject extends Component {
    componentDidMount() {
        const str = this.props.match.params.id;
        this.props.fetchProjectCatalogByUrl("-" + str)
    }

    render() {
        window.$(document).ready(function () {
            window.$(this).attr("data-background")
            let pageSection = window.$(".bg-img, section");
            pageSection.each(function () {
                if (window.$(this).attr("data-background")) {
                    window.$(this).css("background-image", "url(" + window.$(this).data("background") + ")");
                }
            })
        })
        return (
            <ContentWrapper>
                <div className="banner-header banner-img valign bg-img bg-fixed"
                     data-overlay-light="3"
                     data-background={Banner}/>
                {
                    this.props.loading || !this.props.catalog
                        ? <Loader/>
                        : <React.Fragment>                {
                            this.props.catalog.map((project, index) => {
                                return (
                                    <div className="section-padding2" key={index}>
                                        <div className="container">
                                            {
                                                project.categoryData.map((url, number) => {
                                                    return (

                                                        <React.Fragment key={number}>
                                                            <div className="row">
                                                                <div className="col-md-12">
                                                                    <h2 className="section-title2">{url.projectTitle}</h2>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-8">
                                                                    <p dangerouslySetInnerHTML={{__html: url.projectText}}/>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <p><b>Year : </b> {url.projectYear}</p>
                                                                    <p><b>Company : </b> {url.projectCompany}</p>
                                                                    <p><b>Project Name : </b> {url.projectTitle}</p>
                                                                    <p><b>Location : </b> {url.projectLocation}</p>
                                                                </div>
                                                            </div>
                                                            <LightBoxGallery
                                                                className="popup-gallery"
                                                                config={config}
                                                            >
                                                                {
                                                                    url.projectImgUrl.map((urlImg, num) => {
                                                                        return (
                                                                            <div className="col-md-6" key={num}>
                                                                                <GalleryItem
                                                                                    className="gallery-item"
                                                                                    href={urlImg}
                                                                                    title={project.categoryName}
                                                                                >
                                                                                    <div className="gallery-box">
                                                                                        <div className="gallery-img">
                                                                                            <img src={urlImg}
                                                                                                 className="img-fluid mx-auto d-block"
                                                                                                 alt="work-img"/>
                                                                                        </div>
                                                                                    </div>
                                                                                </GalleryItem>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </LightBoxGallery>

                                                        </React.Fragment>
                                                    )
                                                })
                                            }

                                        </div>
                                    </div>
                                )
                            })
                        }</React.Fragment>
                }


                {/*<div className="projects-prev-next">
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
                </div>*/}

                {/*<!-- Footer -->*/}
            </ContentWrapper>
        )
    }
}

function mapStateToProps(state) {
    return {
        catalog: state.project.singleCatalog,
        loading: state.project.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchProjectCatalogByUrl: id => dispatch(fetchProjectCatalogByUrl(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CatalogSingleProject);