import React, {Component} from 'react';
import $ from 'jquery'
import OwlCarousel from 'react-owl-carousel2';
import {fetchProjectById, fetchProjects} from "../store/actions/project";
import {connect} from "react-redux";
import Loader from "./UI/Loader/Loader";

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

class Header extends Component {
    componentDidMount() {
        this.props.fetchProjectById()
    }


    render() {



        return (
            <header id="home" className="header slider-fade" data-scroll-index="0">
                <div className="header slider-fade">
                    <OwlCarousel clasname="owl-carousel owl-theme" options={options} events={events}>
                        {
                            this.props.loading || !this.props.projectList
                                ? <Loader/>
                                : <React.Fragment>{this.props.projectList.map((project, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            {
                                                project.projectImgUrl.map((projectBg, index) => {
                                                    return (
                                                        <div className="text-left item bg-img" data-overlay-dark="3"
                                                             key={index}
                                                             style={{backgroundImage: `url(${project.projectImgUrl})`}}>
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
                                                })
                                            }
                                        </React.Fragment>
                                    )
                                })}</React.Fragment>

                        }
                    </OwlCarousel>
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

