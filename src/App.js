import React, {useEffect, useState} from "react";
import {Route, Switch, useHistory} from 'react-router-dom'
import ScrollToTop from 'react-router-scroll-top'
import ToTop from "./components/UI/ToTopButton";
import Contents from "./components/contents";
import Layout from "./components/Layout";
import ProjectPage from "./components/ProjectPage";
import './assets/css/plugins.css';
import './assets/css/style.css';
import './customHooks/importScript';
import {firebase} from "./util/firebase";
import Auxiliary from "./Auxiliary/Auxiliary";
import Login from "./components/sections/Login";
import Panel from "./components/AdminPanel/AdminPanelHome"
import AdminEditorsList from "./components/AdminPanel/Panels/Slider/SliderPanel";
import ProjectEditorsPanel from "./components/AdminPanel/Panels/Projects-list/ProjectListPanel";
import PreLoader from "./components/preLoader";
import AdminSliderSingleProject from "./components/AdminPanel/Panels/Slider/AdminSliderSingleProject";
import SliderEdit from "./components/AdminPanel/Panels/Slider/SliderEdit";
import ProjectCatalogEdit from "./components/AdminPanel/Panels/Projects-list/ProjectListEdit";
import AdminProjectListSingleProject from "./components/AdminPanel/Panels/Projects-list/CatalogSingleProject";
import Projects from "./components/sections/Projects";

const App = () => {
    const history = useHistory();
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [hasAccount, setHasAccount] = useState('');
    let location = false

    window.$(document).ready(function () {
        window.$(this).attr("data-background")
        let pageSection = window.$(".bg-img, section");
        pageSection.each(function () {
            if (window.$(this).attr("data-background")) {
                window.$(this).css("background-image", "url(" + window.$(this).data("background") + ")");
            }
        })
    })


    const clearInputs = () => {
        setEmail('')
        setPassword('')
    }

    const clearErrors = () => {
        setEmailError('')
        setPasswordError('')
    }

    const handleLogin = () => {
        clearInputs();
        firebase
            .auth()
            .setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {
            return firebase.auth().signInWithEmailAndPassword(email, password)
        })
            .catch(err => {
                switch (err.code) {
                    case "auth/invalid-email":
                    case "auth/user-disabled":
                    case "auth/user-not-found":
                        setEmailError(err.message);
                        break
                    case "auth/wrong-password":
                        setPasswordError(err.message);
                        break
                    default:
                }
            })
    }

    const handleSignUp = () => {
        clearErrors();
        firebase
            .auth()
            .setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {
            return firebase.auth().createUserWithEmailAndPassword(email, password)
        })
            .catch(err => {
                switch (err.code) {
                    case "auth/email-already-in-use":
                    case "auth/invalid-email":
                    case "auth/user-not-found":
                        setEmailError(err.message);
                        break
                    case "auth/weak-password":
                        setPasswordError(err.message);
                        break
                    default:
                }
            })
    }

    const autoLogoutUser = (time) => {
        setTimeout(() => {
            history.push('/');
            firebase.auth().signOut();
        }, time * 5000)
    }

    const handleLogOut = () => {
        history.push('/');
        firebase.auth().signOut();
    };

    const authListener = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                clearInputs();
                autoLogoutUser(1200)
                setUser(user)
            } else {
                setUser("")
            }
        });
    }

    location = firebase.auth().currentUser !== null;





    useEffect(() => {
        authListener()
        if (location === true) {
            let locationPath = window.location.pathname
            if (window.performance) {
                // eslint-disable-next-line
                if (performance.navigation.type == 1) {
                    history.push(locationPath)
                } else {
                    history.push("/slider-project")
                }
            }
        }
    })
    return (
        <Auxiliary>

            {user ?
                (
                    <Switch>
                        <React.Fragment>
                            <ToTop/>
                            <ScrollToTop>
                                <Panel handleLogOut={handleLogOut}>
                                    <Route exact path="/slider-project" component={AdminEditorsList}/>
                                    <Route exact path="/projects-catalog" component={ProjectEditorsPanel}/>
                                    <Route path="/project-catalog-add" component={ProjectCatalogEdit}/>
                                    <Route path="/slider-add" component={SliderEdit}/>
                                </Panel>

                                <Route exact path="/slider-project/:id" component={AdminSliderSingleProject}/>
                                <Route path="/projects-catalog/:id" component={AdminProjectListSingleProject}/>
                            </ScrollToTop>

                        </React.Fragment>
                        <PreLoader/>
                    </Switch>
                )
                : (
                    <Switch>
                        <Route path="/login" children={
                            <Login
                                email={email}
                                setEmail={setEmail}
                                password={password}
                                setPassword={setPassword}
                                handleLogin={handleLogin}
                                handleSignUp={handleSignUp}
                                hasAccount={hasAccount}
                                setHasAccount={setHasAccount}
                                emailError={emailError}
                                passwordError={passwordError}
                            />}/>
                        <Layout>
                            <ToTop/>
                            <ScrollToTop>
                                <Route path="/project/:id" component={ProjectPage}/>
                                <Route path="/project" exact component={Projects}/>
                                <Route path="/" exact component={Contents}/>
                            </ScrollToTop>
                        </Layout>
                    </Switch>
                )


            }
        </Auxiliary>
    );

}

export default App;
