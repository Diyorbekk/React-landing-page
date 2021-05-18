import React, {Component} from "react";
import {Link} from "react-router-dom"
import logo from '../assets/img/logo.png'


class NavigationBar extends Component {
    render() {
        var nav = (
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

        if (window.location.pathname === '/Project') {
            nav = (
                <React.Fragment>
                    <li className="nav-item">
                        <a className="nav-link nav-color" href="index.html#home">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link nav-color" href="index.html#about">About</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link active " href="index.html#projects">Projects</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link nav-color" href="index.html#services">Services</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link nav-color" href="index.html#blog">Blog</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link nav-color" href="index.html#contact">Contact</a>
                    </li>
                </React.Fragment>
            )
        }

        return (
            <nav className="navbar navbar-expand-lg">
                <div className="container">
                    <Link className="logo" to="/"
                          onClick={() => window.location.reload()}
                    >
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
}

export default NavigationBar;