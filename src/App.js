import React, {Component} from "react";
import {Redirect, Route, Switch, useParams} from 'react-router-dom'
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

        function Child() {
            // We can use the `useParams` hook here to access
            // the dynamic pieces of the URL.
            let { id } = useParams();

            return (
                <div>
                    <h3>ID: {id}</h3>
                </div>
            );
        }

        return (
            <Switch>
                <Layout>
                    <ToTop/>
                    <ScrollToTop>
                        <Route path="/all-project/:id" children={<Child />}/>
                        <Route path="/project" component={ProjectPage}/>
                        <Route path="/home" component={Contents}/>
                        <Redirect from='/' to="/home"/>
                    </ScrollToTop>

                </Layout>
            </Switch>
        );
    }

}

export default App;
