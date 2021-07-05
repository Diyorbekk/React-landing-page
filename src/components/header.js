import React, {Component} from 'react';
import {fetchProjectById, fetchProjects} from "../store/actions/project";
import {connect} from "react-redux";
import Loader from "./UI/Loader/Loader";
import OwlCarousel from "react-owl-carousel2";
import image from "../assets/img/projects/1.jpg"
import $ from 'jquery';
window.jQuery = $;
window.$ = $;

class Header extends Component {

    componentDidMount() {
        this.props.fetchProjectById()
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
                window.$(document).ready(function () {
                    let pageSection = window.$(".bg-img, section");
                    pageSection.each(function () {
                        if (window.$(this).attr("data-background")) {
                            window.$(this).css("background-image", "url(" + window.$(this).data("background") + ")");
                        }
                    });
                    let owlItem = window.$('.owl-item')
                    let owlItemActive = window.$('.owl-item.active')
                    let owlItemClone = window.$('.owl-item.cloned')
                    if (owlItem.hasClass("active") || owlItemClone.hasClass("active")) {
                        window.$(owlItemActive).not('.cloned').find('h1').addClass('animated fadeInUp');
                        window.$(owlItemActive).not('.cloned').find('p').addClass('animated fadeInUp');
                        setTimeout(function () {
                            window.$(owlItemActive).not('.cloned').find('h1').removeClass('animated fadeInUp')
                            window.$(owlItemActive).not('.cloned').find('p').removeClass('animated fadeInUp')
                        }, 2000);
                    }
                })

            }
        };


        return (
            <header id="home" className="header slider-fade" data-scroll-index="0">
                <div className="header slider-fade">

                    {
                        this.props.loading || this.props.projectList.length === 0
                            ? <Loader/>
                            :
                            <OwlCarousel clasname="owl-carousel owl-theme" options={options} events={events}>
                                {this.props.projectList.map((project, index) => {

                                    return (
                                        <div className="text-left item bg-img" key={index} data-overlay-dark="3"
                                             data-background={project.projectImgUrl || image}>
                                            <div className="v-bottom caption">
                                                <div className="container">
                                                    <div className="row">
                                                        <div className="col-md-7 col-xl-8">
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

                    }
                </div>
            </header>
        );
    }


}

function mapStateToProps(state) {
    return {
        projectsUrl: state.project.projects,
        projectList: state.project.projectList,
        loading: state.project.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchProjects: () => dispatch(fetchProjects()),
        fetchProjectById: () => dispatch(fetchProjectById()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

