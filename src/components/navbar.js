import React from "react";
import {useLocation} from "react-router-dom"
import logo from '../assets/img/logo.png'
import $ from 'jquery'
import {HashLink} from "react-router-hash-link";


function NavigationBar(props) {
    var location = useLocation();

    var nav = null

    if (window.location.href.indexOf('home') > -1) {
        nav = (
            <React.Fragment>
                <li className="nav-item">
                    <p className="nav-link mb-0" data-scroll-nav="0">Home</p>
                </li>
                <li className="nav-item">
                    <p className="nav-link mb-0" data-scroll-nav="1">About</p>
                </li>
                <li className="nav-item">
                    <p className="nav-link mb-0" data-scroll-nav="2">Projects</p>
                </li>
                <li className="nav-item">
                    <p className="nav-link mb-0" data-scroll-nav="3">Services</p>
                </li>
                <li className="nav-item">
                    <p className="nav-link mb-0" data-scroll-nav="4">Blog</p></li>
                <li className="nav-item">
                    <p className="nav-link mb-0" data-scroll-nav="5">Contact</p>
                </li>
            </React.Fragment>
        )
    } else {
        $(document).ready(function () {
            var url = window.location.href.indexOf(location.pathname);
            $('.nav-color').each(function () {
                var el = $(this);
                var effect = el.data('active');
                console.log(url)
                // eslint-disable-next-line
                if (effect==location.pathname) {
                    $(this).addClass('active');
                }
            });
        })


        nav = (
            <React.Fragment>
                <li className="nav-item">
                    <HashLink
                        className="nav-link nav-color"
                        data-active="/home" to="/home#home"
                        scroll={(el) => el.scrollIntoView({ behavior: 'smooth' })}
                    >
                        Home
                    </HashLink>
                </li>
                <li className="nav-item">
                    <HashLink className="nav-link nav-color" data-active="/about"  to="/home#about">About</HashLink>
                </li>
                <li className="nav-item">
                    <HashLink className="nav-link nav-color" data-active="/project" to="/home#projects">Projects</HashLink>
                </li>
                <li className="nav-item">
                    <HashLink className="nav-link nav-color" data-active="/services" to="/home#services">Services</HashLink>
                </li>
                <li className="nav-item">
                    <HashLink className="nav-link nav-color" data-active="/blog" to="/home#blog">Blog</HashLink>
                </li>
                <li className="nav-item">
                    <HashLink className="nav-link nav-color" data-active="/contact" to="/home#contact">Contact</HashLink>
                </li>
            </React.Fragment>
        )
    }


    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container">
                <HashLink className="logo" to="/home">
                    <img src={logo} alt="logo"/>
                </HashLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="icon-bar">
                            <i className="ti-line-double"/></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        {nav}
                    </ul>
                </div>
            </div>
        </nav>

    )
}

export default NavigationBar;