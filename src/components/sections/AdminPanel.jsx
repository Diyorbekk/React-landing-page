import React, {useEffect, useState} from 'react'
import Login from "./Login";
import {firebase} from "../../util/firebase";
import Panel from "./Panel";
import PreLoader from "../preLoader";


const AdminPanel = () => {
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
            .signInWithEmailAndPassword(email, password)
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
            .createUserWithEmailAndPassword(email, password)
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

    const handleLogOut = () => {
        firebase.auth().signOut();
    };


    const authListener = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                clearInputs();
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
        <React.Fragment>

            {user ? (
                <Panel handleLogOut={handleLogOut}/>
            ) : (
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

                />
            )}
            <PreLoader/>
        </React.Fragment>
    )
};
export default AdminPanel