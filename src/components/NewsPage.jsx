import React, {Component} from "react";
import Banner from "../assets/img/banner.jpg";
import Loader from "./UI/Loader/Loader";
import ContentWrapper from "./content-wrapper";
import {connect} from "react-redux";
import {fetchNews} from "../store/actions/project";
import {NavLink} from "react-router-dom";
import Footer from "./Footer";
import $ from "jquery";

$(document).ready(function () {
    $('#preloader').delay(1500).fadeOut(800)
    $(this).attr("data-background")
    let pageSection = $(".bg-img, section");
    pageSection.each(function () {
        if ($(this).attr("data-background")) {
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    })
})
class NewsPage extends Component {
    componentDidMount() {
        this.props.fetchNews(this.props.match.params.id)

    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.props.fetchNews(this.props.match.params.id)
        }

    }

    render() {


        return (
            <ContentWrapper>
                <section className="banner-header banner-img valign bg-img bg-fixed" data-overlay-light="3"
                         data-background={Banner}>
                </section>

                {
                    this.props.loading || !this.props.newsPageSingle
                        ? <Loader/>
                        : <React.Fragment>{
                            this.props.newsPageSingle.map((single, index) => {
                                return (
                                    <section className="pb-90" key={index}>
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <img src={single.projectImgUrl} className="mb-30" alt=""/>
                                                    <h2 className="section-title2">{single.projectTitle}</h2>
                                                    <p dangerouslySetInnerHTML={{__html: single.projectText}}/>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                )
                            })}
                        </React.Fragment>
                }

                <section className="projects-prev-next">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="d-sm-flex align-items-center justify-content-between">
                                    {
                                        !this.props.newsPageSingle
                                            ? <Loader/>
                                            : <React.Fragment>
                                                <div className="projects-prev-next-left">
                                                    {
                                                        this.props.previous === null

                                                            ? <NavLink to={"/project"} className="invisible"> <i
                                                                className="ti-arrow-left"/> Previous
                                                                Project</NavLink>
                                                            : <NavLink to={this.props.previous}> <i
                                                                className="ti-arrow-left"/> Previous
                                                                Project</NavLink>
                                                    }

                                                </div>
                                                <NavLink to={"/news-blog"}><i className="ti-layout-grid3-alt"/></NavLink>
                                                <div className="projects-prev-next-right">
                                                    {
                                                        this.props.nextProps === null

                                                            ? <NavLink to={"/project"} className="invisible">Next Project <i
                                                                className="ti-arrow-right"/></NavLink>
                                                            : <NavLink to={this.props.nextProps}>Next Project <i
                                                                className="ti-arrow-right"/></NavLink>
                                                    }
                                                </div>
                                            </React.Fragment>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/*<!-- Footer -->*/}
                <Footer/>
            </ContentWrapper>
        )
    }
}

function mapStateToProps(state) {
    return {
        newsPageSingle: state.project.newsPage,
        previous: state.project.previous,
        nextProps: state.project.next,
        loading: state.project.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchNews: id => dispatch(fetchNews(id)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(NewsPage);
