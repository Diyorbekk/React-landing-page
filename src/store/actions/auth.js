import axios from "axios";
import {AUTH_SUCCESS, AUTH_LOGOUT} from "./actionTypes";
import {firebase} from "../../util/firebase";

export function auth(email, emailError, password, passwordError, isLogin) {
    return async dispatch => {
        const authData = {
            email, emailError, password, passwordError, returnSecureToken: true
        };

        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAKuALFnhUylZ7-t-KqQubpnIQlExcB2kQ"

        if (isLogin) {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAKuALFnhUylZ7-t-KqQubpnIQlExcB2kQ"
        }

        let resData = []
        let resDataError = null

        await axios.post(url, authData)
            .then(
                res => resData = res.data
            )
            .catch(
                res => resDataError = res.response.data.error.message
            )

        if(resDataError === "EMAIL_NOT_FOUND") {
            alert("Error")

        }
        const expirationDate = new Date(new Date().getTime() + resData.expiresIn * 1000)

        localStorage.setItem('token', resData.idToken)
        localStorage.setItem('userId', resData.localId)
        localStorage.setItem('expirationDate', expirationDate)

        dispatch(authSuccess(resData.idToken))
        dispatch(autoLogout(resData.expiresIn))
    }
}

export function autoLogout(time) {
    return dispatch => {
        firebase.auth().signOut();
        setTimeout(() => {
            dispatch(logout())
        }, time * 1000)
    }
}

export function logout() {
    firebase.auth().signOut();
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expirationDate')

    return {
        type: AUTH_LOGOUT
    }
}

export function autoLogin() {
    return dispatch => {
        const token = localStorage.getItem('token')
        if (!token) {
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if (expirationDate <= new Date()) {
                dispatch(logout())
            } else {
                dispatch(authSuccess(token))
                dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}

export function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token
    }
}