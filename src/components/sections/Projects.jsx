import React, {Component} from "react";
import ContentWrapper from "../content-wrapper";
import Banner from "../../assets/img/banner.jpg";
import {getProjectCategory} from "../../store/actions/project";
import {connect} from "react-redux";
import {GalleryItem, LightBoxGallery} from "@sekmet/react-magnific-popup";
import Loader from "../UI/LoaderMinHeight/Loader";
import {withRouter} from "react-router-dom";

class Projects extends Component {
    state = {
        categoryTitle: "Architecture",
        categoryText: "Architecture (Latin architectura, from the Greek ἀρχιτέκτων arkhitekton \"architect\", from ἀρχι- \"chief\" and τέκτων \"creator\") is both the process and the product of planning, designing, and constructing buildings or other structures. Architectural works, in the material form of buildings, are often perceived as cultural symbols and as works of art. Historical civilizations are often identified with their surviving architectural achievements.",
        time: false,
        id: null,
        categoryOptions: [
            {text: "Architecture", value: 2},
            {text: "Interior Design", value: 3},
            {text: "Urban Design", value: 4},
            {text: "Planning", value: 5},
            {text: "3D Modelling", value: 6},
            {text: "Decor Plan", value: 7}
        ]
    }

    componentDidMount() {
        this.props.getProjectCategory(1)
    }

    categoryValue(el) {
        this.categoryNone(false)
        this.setState({
            time: false
        })
        this.props.getProjectCategory(el.target.id)
        window.$(".sidebar .services ul li").removeClass("active")
        window.$('#' + el.target.id).parent().addClass("active")

        if (parseInt(el.target.id) === 2) {
            this.setState({
                categoryTitle: "Architecture",
                categoryText: "Architecture (Latin architectura, from the Greek ἀρχιτέκτων arkhitekton \"architect\", from ἀρχι- \"chief\" and τέκτων \"creator\") is both the process and the product of planning, designing, and constructing buildings or other structures. Architectural works, in the material form of buildings, are often perceived as cultural symbols and as works of art. Historical civilizations are often identified with their surviving architectural achievements."
            })
        }

        if (parseInt(el.target.id) === 3) {
            this.setState({
                categoryTitle: "Interior Design",
                categoryText: "Interior design is the art and science of enhancing the interior of a building to achieve a healthier and more aesthetically pleasing environment for the people using the space. An interior designer is someone who plans, researches, coordinates, and manages such enhancement projects. Interior design is a multifaceted profession that includes conceptual development, space planning, site inspections, programming, research, communicating with the stakeholders of a project, construction management, and execution of the design."
            })
        }

        if (parseInt(el.target.id) === 4) {
            this.setState({
                categoryTitle: "Urban Design",
                categoryText: "Urban design is the process of designing and shaping the physical features of cities, towns, and villages and planning for the provision of municipal services to residents and visitors. Although it deals with issues of a larger scale than architecture, it cannot be understood as a wholly separated field of research and design, since the quality of one depends on the quality of the other. In fact, it is this very interdependency, which has been termed relational design by Barcelona-based architect Enric Massip-Bosch, which makes urban design and architecture inextricably linked in many university education programs, especially in Europe. This tendency towards reintegration in architectural studies is also gaining momentum in the USA."
            })
        }

        if (parseInt(el.target.id) === 5) {
            this.setState({
                categoryTitle: "Planning",
                categoryText: "Planning is the process of thinking about the activities required to achieve a desired goal. It is the first and foremost activity to achieve desired results. It involves the creation and maintenance of a plan, such as psychological aspects that require conceptual skills. There are even a couple of tests to measure someone’s capability of planning well. As such, planning is a fundamental property of intelligent behavior. An important further meaning, often just called \"planning\", is the legal context of permitted building developments."
            })
        }
        if (parseInt(el.target.id) === 6) {
            this.setState({
                categoryTitle: "3D Modelling",
                categoryText: "In 3D computer graphics, 3D modeling is the process of developing a mathematical coordinate-based representation of any surface of an object (inanimate or living) in three dimensions via specialized software.\n" +
                    "\n" +
                    "Three-dimensional (3D) models represent a physical body using a collection of points in 3D space, connected by various geometric entities such as triangles, lines, curved surfaces, etc. Being a collection of data (points and other information), 3D models can be created manually, algorithmically (procedural modeling), or by scanning. Their surfaces may be further defined with texture mapping."
            })
        }

        if (parseInt(el.target.id) === 7) {
            this.setState({
                categoryTitle: "Decor Plan",
                categoryText: "A Decor plan, or 3D floorplan, is a virtual model of a building floor plan, depicted from a birds eye view, utilized within the building industry to better convey architectural plans. Usually built to scale, a 3D floor plan must include walls and a floor and typically includes exterior wall fenestrations, windows, and doorways. It does not include a ceiling so as not to obstruct the view. Other common attributes may be added, but are not required, such as cabinets, flooring, bathroom fixtures, paint color, wall tile, and other interior finishes. Furniture may be added to assist in communicating proper home staging and interior design.[1]"
            })
        }

        this.categoryClick(true)
    }

    categoryClick = (el) => {
        if (el === true) {
            const timer = setTimeout(() => {
                console.log("false")
                this.setState({
                    time: true
                })
            }, 6000);
            if (this.state.time === false) {
                clearTimeout(timer);
                return (
                    <div className="empty-category">There are no photos in this category</div>
                )
            }
        } else {
            return false
        }

    }

    categoryNone(e) {
        if (e === false) {
            return false
        } else {
            const timer = setTimeout(() => {
                this.setState({
                    time: true
                })
            }, 6000);
            if (this.state.time === false) {
                return (
                    <Loader/>
                )
            } else {
                clearTimeout(timer);
                return (
                    <div className="empty-category">There are no photos in this category</div>
                )
            }
        }
    }

    projectLink(el) {
        this.props.history.push('/project/' + el);
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
                    return item.el.attr('title') + '<small>by RENDERTIME INTERIOR STUDIO</small>';
                }
            }
        }
        return (
            <ContentWrapper>
                <div className="banner-header banner-img valign bg-img bg-fixed"
                     data-overlay-light="3"
                     data-background={Banner}/>
                <section className="projects section-padding2">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h2 className="section-title2">{this.state.categoryTitle}</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-8">
                                <p>{this.state.categoryText}</p>
                                <React.Fragment>
                                    {
                                        this.props.loading || this.props.category === null
                                            ? this.categoryClick(false) || this.categoryNone(true)
                                            : this.props.category.length === 0
                                            ? <Loader/>
                                            : <LightBoxGallery
                                                className="popup-gallery"
                                                config={config}
                                            >
                                                {
                                                    this.props.category.map((category, index) => {
                                                        return (
                                                            <React.Fragment key={index}>
                                                                {
                                                                    category.data.categoryData.map((urlImage, number) => {
                                                                        return (
                                                                            <div className="col-md-6" key={number}>
                                                                                <GalleryItem
                                                                                    className="gallery-item"
                                                                                    href={urlImage.projectImgUrl[number]}
                                                                                    title={urlImage.projectCompany}
                                                                                >
                                                                                    <div className="gallery-box">
                                                                                        <div
                                                                                            className="gallery-img">
                                                                                            <img
                                                                                                src={urlImage.projectImgUrl[number]}
                                                                                                className="img-fluid mx-auto d-block"
                                                                                                loading={"lazy"}
                                                                                                alt="work-img"/>
                                                                                        </div>
                                                                                    </div>
                                                                                </GalleryItem>

                                                                                <div className="position-relative">
                                                                                    <div
                                                                                        onClick={() => this.projectLink(category.path)}
                                                                                        className="service-link">
                                                                                        <h6 className="two-line-text">{category.data.categoryName}</h6>
                                                                                        <h5>{urlImage.projectTitle}</h5>
                                                                                        <div className="line"/>
                                                                                        <i className="ti-arrow-right"/>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </React.Fragment>
                                                        )
                                                    })
                                                }

                                            </LightBoxGallery>

                                    }

                                </React.Fragment>
                            </div>
                            <div className="col-md-4 sidebar-side">
                                <aside className="sidebar blog-sidebar">
                                    <div className="sidebar-widget services">
                                        <div className="widget-inner">
                                            <div className="sidebar-title">
                                                <h4>All Services</h4>
                                            </div>
                                            <ul>
                                                {
                                                    // eslint-disable-next-line
                                                    this.state.categoryOptions.map((options, index) => {
                                                        if (index === 0) {
                                                            return (
                                                                <li className="active"
                                                                    onClick={(el) => this.categoryValue(el)}
                                                                    key={options.value}>
                                                                    <span id={options.value}>{options.text}</span>
                                                                </li>
                                                            )
                                                        }
                                                        if (index !== 0) {
                                                            return (

                                                                <li onClick={(el) => this.categoryValue(el)}
                                                                    key={options.value}>
                                                                    <span id={options.value}>{options.text}</span>
                                                                </li>

                                                            )
                                                        }

                                                    })
                                                }

                                            </ul>
                                        </div>
                                    </div>
                                </aside>
                            </div>
                        </div>
                    </div>
                </section>
            </ContentWrapper>
        )
    }
}

function mapStateToProps(state) {
    return {
        category: state.project.GetCategory,
        loading: state.project.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getProjectCategory: id => dispatch(getProjectCategory(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Projects));
