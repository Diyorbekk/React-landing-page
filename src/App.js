import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './assets/css/plugins.css';
import './assets/css/style.css';
import ScrollToTop from 'react-router-scroll-top'
import ToTop from "./components/UI/ToTopButton";
import PreLoader from "./components/preLoader";
import ContentWrapper from "./components/content-wrapper";
import Layout from "./components/Layout";
import ProjectPage from "./components/ProjectPage";


class App extends Component {
    render() {
        return (
            <Layout>
                <ToTop/>
                <Router>
                    <ScrollToTop>
                        <Switch>
                            <Route path="/Project">
                                <ProjectPage />
                            </Route>
                            <Route exact path="/">
                                <ContentWrapper />
                            </Route>
                        </Switch>
                    </ScrollToTop>
                </Router>
                <PreLoader/>
            </Layout>
        );
    }
}

export default App;
