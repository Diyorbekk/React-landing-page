import React, {useEffect, useState} from "react";
import {Redirect, Route, Switch, useHistory} from 'react-router-dom'
import ScrollToTop from 'react-router-scroll-top'
import ToTop from "./components/UI/ToTopButton";
import Contents from "./components/contents";
import Layout from "./components/Layout";
import ProjectPage from "./components/ProjectPage";
import './assets/css/plugins.css';
import './assets/css/style.css';
import './customHooks/importScript';
//import {removeScript} from "./customHooks/removeScript";
import {appendScript} from "./customHooks/importScript";
import {firebase} from "./util/firebase";
import Auxiliary from "./Auxiliary/Auxiliary";
import Panel from "./components/sections/Panel";
import Login from "./components/sections/Login";
import PreLoader from "./components/preLoader";

const App = () => {
    const history = useHistory();
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [hasAccount, setHasAccount] = useState('');

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
            .setPersistence(firebase.auth.Auth.Persistence.SESSION).then(
            () => {
                history.push('/slider-project');
                return firebase.auth().signInWithEmailAndPassword(email, password);

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
            history.push('/slider-project');
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
                autoLogoutUser(600)
                setUser(user)
            } else {
                setUser("")
            }
        });
    }

    useEffect(() => {
        appendScript("custom-js/bootstrap.min.js");
        appendScript("custom-js/popper.min.js");
        appendScript("custom-js/jquery.waypoints.min.js");
        appendScript("custom-js/scrollIt.min.js");
        appendScript("custom-js/jquery.stellar.min.js");
        appendScript("custom-js/jquery-migrate-3.0.0.min.js");
        appendScript("custom-js/jquery.magnific-popup.js");
        appendScript("custom-js/modernizr-2.6.2.min.js");
        appendScript("custom-js/custom.js");
    })

    /*    componentDidMount() {
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
        }*/
    useEffect(() => {
        authListener()
    })

    return (
        <Auxiliary>

            {user ?
                (
                    <Switch>
                        <Route path="/slider-project" exact children={<Panel
                            handleLogOut={handleLogOut}
                        />}/>
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
                                <Route path="/project" component={ProjectPage}/>
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
