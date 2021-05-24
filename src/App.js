import React, {Component} from "react";
import {Route, Switch} from 'react-router-dom'
import ScrollToTop from 'react-router-scroll-top'
import ToTop from "./components/UI/ToTopButton";
import Contents from "./components/contents";
import Layout from "./components/Layout";
import ProjectPage from "./components/ProjectPage";
import './assets/css/plugins.css';
import './assets/css/style.css';
import './customHooks/importScript';
import {removeScript} from "./customHooks/removeScript";
import {appendScript} from "./customHooks/importScript";
import AdminPanel from "./components/sections/AdminPanel";

class App extends Component {
    componentDidMount() {
        appendScript("custom-js/bootstrap.min.js");
        appendScript("custom-js/popper.min.js");
        appendScript("custom-js/jquery.waypoints.min.js");
        appendScript("custom-js/scrollIt.min.js");
        appendScript("custom-js/jquery.stellar.min.js");
        appendScript("custom-js/jquery-migrate-3.0.0.min.js");
        appendScript("custom-js/jquery.magnific-popup.js");
        appendScript("custom-js/modernizr-2.6.2.min.js");
        appendScript("custom-js/custom.js");
    }

    componentDidUpdate() {
        appendScript("custom-js/bootstrap.min.js");
        appendScript("custom-js/popper.min.js");
        appendScript("custom-js/jquery.waypoints.min.js");
        appendScript("custom-js/scrollIt.min.js");
        appendScript("custom-js/jquery.stellar.min.js");
        appendScript("custom-js/jquery-migrate-3.0.0.min.js");
        appendScript("custom-js/jquery.magnific-popup.js");
        appendScript("custom-js/modernizr-2.6.2.min.js");
        appendScript("custom-js/custom.js");
    }

    componentWillUnmount() {
        removeScript("custom-js/bootstrap.min.js");
        removeScript("custom-js/popper.min.js");
        removeScript("custom-js/jquery.waypoints.min.js");
        removeScript("custom-js/scrollIt.min.js");
        removeScript("custom-js/jquery.stellar.min.js");
        removeScript("custom-js/jquery-migrate-3.0.0.min.js");
        removeScript("custom-js/jquery.magnific-popup.js");
        removeScript("custom-js/modernizr-2.6.2.min.js");
        removeScript("custom-js/custom.js");
    }


    render() {

        return (
                <Switch>
                    <Route exact path="/login" children={<AdminPanel/>}/>
                    <Layout>
                        <ToTop/>
                        <ScrollToTop>

                            <Route path="/project" component={ProjectPage}/>
                            <Route exact path="/" component={Contents}/>
                        </ScrollToTop>
                    </Layout>
                </Switch>
        );
    }

}

export default App;
