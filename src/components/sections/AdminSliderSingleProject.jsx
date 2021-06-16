import React, {Component} from "react";
import OwlCarousel from "react-owl-carousel2";
import $ from "jquery";
import {connect} from "react-redux";
import {fetchProjectByUrl} from "../../store/actions/project";
import Loader from "../UI/Loader/Loader";


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
            onChanged: function (event) {
                var item = event.item.index - 2;     // Position of the current item
                $('h4').removeClass('animated fadeInUp');
                $('h1').removeClass('animated fadeInUp');
                $('p').removeClass('animated fadeInUp');
                $('.butn-light').removeClass('animated fadeInUp');
                $('.owl-item').not('.cloned').eq(item).find('h4').addClass('animated fadeInUp');
                $('.owl-item').not('.cloned').eq(item).find('h1').addClass('animated fadeInUp');
                $('.owl-item').not('.cloned').eq(item).find('p').addClass('animated fadeInUp');
                $('.owl-item').not('.cloned').eq(item).find('.butn-light').addClass('animated fadeInUp');
            }
        };

        return (
            <React.Fragment>
                {
                    this.props.loading || !this.props.project
                        ? <Loader/>
                        : this.props.project.map((project, index) => {
                            console.log(project.projectImgUrl[index])
                            return (
                                <div className="header slider-fade" key={index}>
                                    <OwlCarousel clasname="owl-carousel owl-theme" options={options} events={events}>
                                        {project.projectImgUrl.map(projectBg => {
                                            return (
                                                <div className="text-left item bg-img" data-overlay-dark="3"
                                                         style={{backgroundImage: `url(${projectBg})`}}>
                                                <div className="v-bottom caption">
                                                    <div className="container">
                                                        <div className="row">
                                                            <div className="col-md-7">
                                                                <div className="o-hidden">
                                                                    <h1>{project.projectTitle}</h1>
                                                                    <hr/>
                                                                    <p>{project.projectText}</p>
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
