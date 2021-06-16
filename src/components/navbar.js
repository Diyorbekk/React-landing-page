import React from "react";
import {useLocation} from "react-router-dom"
import logo from '../assets/img/logo.png'
import $ from 'jquery'
import {HashLink} from "react-router-hash-link";


function NavigationBar() {
    let location = useLocation();

    let nav = null


    if (location.pathname === '/') {
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
            $('.nav-color').each(function () {
                var el = $(this);
                var effect = el.data('active');
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
                        data-active="/home" to="/#home"
                        scroll={(el) => el.scrollIntoView({ behavior: 'smooth' })}
                    >
                        Home
                    </HashLink>
                </li>
                <li className="nav-item">
                    <HashLink className="nav-link nav-color" data-active="/about"  to="/#about">About</HashLink>
                </li>
                <li className="nav-item">
                    <HashLink className="nav-link nav-color" data-active="/project" to="/#projects">Projects</HashLink>
                </li>
                <li className="nav-item">
                    <HashLink className="nav-link nav-color" data-active="/services" to="/#services">Services</HashLink>
                </li>
                <li className="nav-item">
                    <HashLink className="nav-link nav-color" data-active="/blog" to="/#blog">Blog</HashLink>
                </li>
                <li className="nav-item">
                    <HashLink className="nav-link nav-color" data-active="/contact" to="/#contact">Contact</HashLink>
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