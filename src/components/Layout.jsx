import React, {Component} from 'react'
import NavigationBar from "../components/navbar";
import Footer from "../components/Footer";

class Layout extends Component {
    render() {
        return (
            <React.Fragment>
                <NavigationBar/>
                {this.props.children}
                <Footer/>
            </React.Fragment>
        );
    }
}

export default Layout