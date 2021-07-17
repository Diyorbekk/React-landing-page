import React, {Component} from "react";
import ContentWrapper from "../content-wrapper";
import Banner from "../../assets/img/banner.jpg";
import Loader from "../UI/Loader/Loader";
import {NavLink} from "react-router-dom";
import {fetchNews} from "../../store/actions/project";
import {connect} from "react-redux";
import Footer from "../Footer";


class NewsBlog extends Component {
    componentDidMount() {
        this.props.fetchNews()
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
                <section className="banner-header banner-img valign bg-img bg-fixed" data-overlay-light="3"
                         data-background={Banner}>
                </section>

                <section className="bauen-blog section-padding2">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h2 className="section-title">Our <span>Blog</span></h2>
                            </div>
                        </div>
                        <div className="row">
                            {
                                this.props.loading || this.props.newsList.length === 0
                                    ? <Loader/>
                                    : <React.Fragment>
                                        {
                                            this.props.newsList.map((newsList, index) => {
                                                return (
                                                    <div className="col-md-6">
                                                        <div className="item" key={index}>
                                                            <NavLink to={"/news/" + newsList.path}
                                                                     className="h-100 d-block">
                                                                <div className="position-re o-hidden h-100">
                                                                    <img src={newsList.data.projectImgUrl}
                                                                         alt="slider"/>
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
                                                    </div>
                                                )
                                            })
                                        }
                                    </React.Fragment>
                            }
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
        newsList: state.project.news,
        loading: state.project.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchNews: () => dispatch(fetchNews()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsBlog);
