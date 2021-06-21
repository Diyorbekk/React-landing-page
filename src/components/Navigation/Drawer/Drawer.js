import React, {Component} from 'react'
import classes from './Drawer.module.css'
import {NavLink} from "react-router-dom"
import Backdrop from "../../UI/Backdrop/Backdrop";

class Drawer extends Component {

    clickHandler = () => {
        this.props.onClose()
    };

    logOut = () => {
        this.props.handleLogOut()
    };

    renderLinks(links) {
        return links.map((links, key) => {
            return (
                <li
                    key={key}
                >
                    <NavLink
                        to={links.to}
                        exact={links.exact}
                        activeClassName={classes.active}
                        onClick={this.clickHandler}
                    >{links.label}
                    </NavLink>
                </li>
            )
        })
    }

    render() {
        const cls = [classes.Drawer];

        if (!this.props.isOpen) {
            cls.push(classes.close)
        }

        const links = [
            {to: '/slider-project', label: 'Slider', exact: false},
            {to: '/projects-catalog', label: 'Projects', exact: false},
            {to: '/news', label: 'News', exact: false},
        ]

        return (
            <React.Fragment>
                <nav className={cls.join(' ')}>
                    <ul>
                        {this.renderLinks(links)}
                        <li>
                            <button className="border-0 focus-none" onClick={this.logOut}>
                                <span>Log out</span>
                            </button>
                        </li>
                    </ul>
                </nav>
                {this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null}
            </React.Fragment>
        )
    }
}

export default Drawer