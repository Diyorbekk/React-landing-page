import React, {Component} from 'react'
import NavigationBar from "../components/navbar";
import PreLoader from "./preLoader";

class Layout extends Component {
    render() {
        return (
            <React.Fragment>
                <NavigationBar/>
                {this.props.children}
                <PreLoader/>
            </React.Fragment>
        );
    }
}

export default Layout