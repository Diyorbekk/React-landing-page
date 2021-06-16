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
import Panel from "./components/sections/Panel"
import PreLoader from "./components/preLoader";
import AdminSliderSingleProject from "./components/sections/AdminSliderSingleProject";

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
        authListener()
    })

    return (
        <Auxiliary>

            {user ?
                (
                    <Switch>
                        <React.Fragment>
                            <ToTop/>
                            <ScrollToTop>
                                <Route path="/slider-project" exact children={<Panel
                                    handleLogOut={handleLogOut}
                                />}/>
                                <Route path="/slider-project/:id" exact component={AdminSliderSingleProject}/>
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
