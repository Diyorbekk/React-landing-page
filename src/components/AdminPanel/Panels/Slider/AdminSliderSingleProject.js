import React, {Component} from "react";
import OwlCarousel from "react-owl-carousel2";
import $ from "jquery";
import {connect} from "react-redux";
import {fetchProjectByUrl} from "../../../../store/actions/project";
import Loader from "../../../UI/Loader/Loader";


class AdminSliderSingleProject extends Component {

    componentDidMount() {
        this.props.fetchProjectByUrl(this.props.match.params.id)

    }

    render() {
        const options = {
            items: 1,
            loop: true,
            dots: false,
            margin: 0,
            autoplay: true,
            smartSpeed: 500,
            nav: true,
            animateOut: 'fadeOut',
            navText: ['<i class="ti-angle-left" aria-hidden="true"></i>', '<i class="ti-angle-right" aria-hidden="true"></i>']
        };

        const events = {
            onChanged: function () {
                $(document).ready(function () {
                    let owlItem = $('.owl-item')
                    let owlItemActive = $('.owl-item.active')
                    let owlItemClone = $('.owl-item.cloned')
                    if (owlItem.hasClass("active") || owlItemClone.hasClass("active")) {
                        $(owlItemActive).not('.cloned').find('h1').addClass('animated fadeInUp');
                        $(owlItemActive).not('.cloned').find('p').addClass('animated fadeInUp');
                        setTimeout(function() {
                            $(owlItemActive).not('.cloned').find('h1').removeClass('animated fadeInUp')
                            $(owlItemActive).not('.cloned').find('p').removeClass('animated fadeInUp')
                        }, 2000);
                    }
                })
            }
        };

        return (
            <React.Fragment>
                {
                    this.props.loading || !this.props.project
                        ? <Loader/>
                        : this.props.project.map((project, index) => {
                            return (
                                <div className="header slider-fade" key={index}>
                                    <OwlCarousel clasname="owl-carousel owl-theme" options={options} events={events}>
                                        {project.projectImgUrl.map((projectBg, index) => {
                                            return (
                                                <div className="text-left item bg-img" data-overlay-dark="3" key={index}
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
                                            )
                                        })}

                                    </OwlCarousel>
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
