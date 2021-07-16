import React, {Component} from "react";
import OwlCarousel from 'react-owl-carousel2';
import {NavLink} from "react-router-dom";
import Loader from "../UI/Loader/Loader";
import {connect} from "react-redux";
import {fetchNews} from "../../store/actions/project";


class Blog extends Component {
    componentDidMount() {
        this.props.fetchNews()
    }

    render() {
        const options = {
            rewind: true,
            margin: 30,
            mouseDrag: true,
            autoplay: true,
            dots: true,
            smartSpeed: 500,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                1000: {
                    items: 2
                }
            }
        }

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
                                    : <OwlCarousel clasname="owl-carousel owl-theme" options={options}>
                                        {
                                            this.props.newsList.map((newsList, index) => {
                                                return (
                                                    <div className="item" key={index}>
                                                        <NavLink to={"/news/" + newsList.path} className="h-100 d-block">
                                                            <div className="position-re o-hidden h-100">
                                                                <img src={newsList.data.projectImgUrl} alt="slider"/>
                                                            </div>
                                                            <div className="con">
                                                                <span className="category">
                                                                    <span>{newsList.data.categoryName} </span> -  {newsList.data.createData}
                                                                </span>
                                                                <h5 className="two-line-text">
                                                                    <span>{newsList.data.projectTitle}</span>
                                                                </h5>
                                                            </div>
                                                        </NavLink>
                                                    </div>
                                                )
                                            })
                                        }

                                        {/*                                        <div className="item">
                                            <div className="position-re o-hidden">
                                                <img src={slider_2} alt="slider"/></div>
                                            <div className="con"> <span className="category">
                                        <Link to="blog.html">Interior</Link> - 18.12.2021
                                    </span>
                                                <h5>
                                                    <Link to="post.html">Modernism in Architecture</Link>
                                                </h5>
                                            </div>
                                        </div>
                                        <div className="item">
                                            <div className="position-re o-hidden">
                                                <img src={slider_3} alt="slider"/>
                                            </div>
                                            <div className="con"> <span className="category">
                                        <Link to="blog.html">Urban</Link> - 16.12.2021
                                    </span>
                                                <h5>
                                                    <Link to="post.html">Postmodern Architecture</Link>
                                                </h5>
                                            </div>
                                        </div>
                                        <div className="item">
                                            <div className="position-re o-hidden">
                                                <img src={slider_4} alt=""/>
                                            </div>
                                            <div className="con">
                                        <span className="category">
                                    <Link to="blog.html">Planing</Link> - 14.12.2021
                                </span>
                                                <h5>
                                                    <Link to="post.html">Modern Architecture Buildings</Link>
                                                </h5>
                                            </div>
                                        </div>*/}
                                    </OwlCarousel>
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
