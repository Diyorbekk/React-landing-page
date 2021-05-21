import React, {Component} from 'react'
import NavigationBar from "../components/navbar";
import Footer from "../components/Footer";
import PreLoader from "./preLoader";

class Layout extends Component {
    render() {
        return (
            <React.Fragment>
                <NavigationBar/>
                {this.props.children}
                <Footer/>
                <PreLoader/>
            </React.Fragment>
        );
    }
}

export default Layout