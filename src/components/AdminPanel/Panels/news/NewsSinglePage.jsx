import React, {Component} from "react";
import ContentWrapper from "../../../content-wrapper";
import {fetchNews} from "../../../../store/actions/project";
import Loader from "../../../UI/Loader/Loader";
import {connect} from "react-redux";
import Banner from "../../../../assets/img/banner.jpg";


class NewsSinglePage extends Component {
    componentDidMount() {
        this.props.fetchNews(this.props.match.params.id)
        console.log(this.props.newsPageSingle)
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


            </ContentWrapper>
        )
    }
}

function mapStateToProps(state) {
    return {
        newsPageSingle: state.project.newsPage,
        loading: state.project.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchNews: id => dispatch(fetchNews(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsSinglePage);
