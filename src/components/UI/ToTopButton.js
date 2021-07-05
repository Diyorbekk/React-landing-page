import React, {Component} from "react";
import $ from 'jquery';
window.jQuery = $;
window.$ = $;

class ToTopButton extends Component {
    componentDidMount() {
        let progressPath = document.querySelector('.progress-wrap path');
        let pathLength = progressPath.getTotalLength();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
        progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
        progressPath.style.strokeDashoffset = pathLength;
        progressPath.getBoundingClientRect();
        progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
        let updateProgress = function () {
            let scroll = window.$(window).scrollTop();
            let height = window.$(document).height() - window.$(window).height();
            let progress = pathLength - (scroll * pathLength / height);
            progressPath.style.strokeDashoffset = progress;
        }
        updateProgress();
        window.$(window).scroll(updateProgress);
        let offset = 150;
        let duration = 550;
        window.$(window).on('scroll', function () {
            if (window.$(this).scrollTop() > offset) {
                window.$('.progress-wrap').addClass('active-progress');
            } else {
                window.$('.progress-wrap').removeClass('active-progress');
            }
        });
        window.$('.progress-wrap').on('click', function (event) {
            event.preventDefault();
            window.$('html, body').animate({ scrollTop: 0 }, duration);
            return false;
        })
    }

    render() {
        return (
            <div className="progress-wrap cursor-pointer">
                <svg className="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
                    <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"/>
                </svg>
            </div>
        )
    }
}

export default ToTopButton;