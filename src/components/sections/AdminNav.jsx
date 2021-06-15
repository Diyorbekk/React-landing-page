import React, {Component} from "react";
import Drawer from "../Navigation/Drawer/Drawer";
import MenuToggle from "../Navigation/MenuToggle/MenuToggle";


class AdminNav extends Component {
    handleLogOut = this.props.handleLogOut
    state = {
        menu: false
    };

    toggleMenuHandler = () => {
        this.setState({
            menu: !this.state.menu
        })
    };

    menuCloseHandler = () => {
        this.setState({
            menu: false
        })
    };
    render() {
        return (
            <nav className="d-flex justify-content-between align-items-center py-3">
                <div className="menu">

                    <Drawer
                        isOpen={this.state.menu}
                        onClose={this.menuCloseHandler}
                        handleLogOut={this.handleLogOut}
                    />

                    <MenuToggle
                        onToggle={this.toggleMenuHandler}
                        isOpen={this.state.menu}
                    />
                </div>

                <h2 className="mb-0">Admin Panel</h2>
            </nav>
        )
    }
}

export default AdminNav;
