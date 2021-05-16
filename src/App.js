import React, {Component} from "react";
import Header from "./components/header";
import NavigationBar from "./components/navbar";
import ToTop from "./components/UI/ToTopButton";
import PreLoader from "./components/preLoader";
import './assets/css/plugins.css';
import './assets/css/style.css';
import ContentWrapper from "./components/content-wrapper";

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <NavigationBar/>
                <ToTop/>
                <Header/>
                <ContentWrapper/>
                <PreLoader/>
            </React.Fragment>
        );
    }
}

export default App;
