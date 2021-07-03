import React, {Component} from "react";
import {Link} from "react-router-dom";
import OwlCarousel from 'react-owl-carousel2';
import {fetchProjectCatalogById, fetchProjectsCatalog} from "../../store/actions/project";
import {connect} from "react-redux";
import Loader from "../UI/Loader/Loader";

// Projects owlCarousel

class SingleProject extends Component {
    componentDidMount() {
        this.props.fetchProjectsCatalog()
        this.props.fetchProjectCatalogById()
    }

    renderProjects(props) {



    }

    render() {

        const link = this.props.categoryUrl.map((projectsUrl) => {
            return projectsUrl.id
        })

        const options = {
            loop: true,
            margin: 30,
            mouseDrag: true,
            autoplay: false,
            dots: true,
            autoplayHoverPause: true,
            smartSpeed: 1500,
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
                                    : <OwlCarousel clasname="owl-carousel owl-theme" options={options}>
                                        {
                                            this.props.categoryList.map((projectsList, index) => {
                                                return (
                                                    <div className="item" key={index}>
                                                        <Link to={"/project/" + link[index]} className="h-100 d-block">
                                                            {
                                                                projectsList.categoryData.map((listCategory, number) => {
                                                                    return (
                                                                        <React.Fragment key={number}>
                                                                            <div className="position-re o-hidden h-100">
                                                                                <img src={listCategory.projectImgUrl[0]}
                                                                                     alt={listCategory.projectImgUrl[0]} loading={"lazy"}/>
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
                                                        </Link>
                                                    </div>
                                                )
                                            })
                                        }

                                    </OwlCarousel>
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
