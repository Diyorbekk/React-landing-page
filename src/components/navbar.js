import React from "react";
import {Link, useLocation} from "react-router-dom"
import logo from '../assets/img/logo.png'
import {NavHashLink} from "react-router-hash-link";
import $ from 'jquery';
window.jQuery = $;
window.$ = $;


function NavigationBar() {
    let location = useLocation();
    let nav = null

    const scrollWidthOffset = (el) => {
        const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
        const yOffset = -880;
        window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
    }


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
                    <p className="nav-link mb-0" data-scroll-nav="4">News</p></li>
                <li className="nav-item">
                    <p className="nav-link mb-0" data-scroll-nav="5">Contact</p>
                </li>
            </React.Fragment>
        )
    } else {
        window.$(document).ready(function () {
            window.$('.nav-color').each(function () {
                let el = window.$(this);
                let effect = el.data('active');
                window.$(this).removeClass('active');
                // eslint-disable-next-line
                if (location.pathname.indexOf(effect) == 0) {
                    window.$(this).addClass('active');
                }
            });
        })


        nav = (
            <React.Fragment>
                <li className="nav-item">
                    <Link
                        className="nav-link nav-color"
                        data-active="/home" to="/"
                    >
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                    <NavHashLink className="nav-link nav-color" data-active="/about"  to="/#about">About</NavHashLink>
                </li>
                <li className="nav-item">
                    <NavHashLink className="nav-link nav-color" data-active="/project" to="/#projects">Projects</NavHashLink>
                </li>
                <li className="nav-item">
                    <NavHashLink className="nav-link nav-color" data-active="/services" to="/#services" scroll={el => scrollWidthOffset(el)} >Services</NavHashLink>
                </li>
                <li className="nav-item">
                    <NavHashLink className="nav-link nav-color" data-active="/news" to="/#blog" scroll={el => scrollWidthOffset(el)}>News</NavHashLink>
                </li>
                <li className="nav-item">
                    <NavHashLink  className="nav-link nav-color" data-active="/contact" to="/#contact" scroll={el => scrollWidthOffset(el)}>Contact</NavHashLink>
                </li>
                
            </React.Fragment>
        )
    }


    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container">
                <Link className="logo" to="/">
                    <img src={logo} alt="logo"/>
                </Link>
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