import React from 'react';
import PreLoader from "../preLoader";

const Login = (props) => {
    const {email, setEmail, password, setPassword, handleLogin, handleSignUp, hasAccount, setHasAccount, emailError, passwordError} = props


    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            if (hasAccount) {
                handleSignUp()
            } else {
                handleLogin()
            }
        }
    }
    return (
        <section className="login">
            <div className="login-wrapper">
                <div className="login-container clear-fix">
                    <div className="login-panel panel-small">
                        <h2 className="login-container_heading">Login</h2>
                        <form className="login-container_form">
                            <div className="login-container_group">
                                <label>Email</label>
                                <input type="text" autoFocus required value={email}
                                       onChange={(e) => setEmail(e.target.value)}
                                       onKeyDown={handleKeyDown}
                                />
                                <small className="error-form text-danger">{emailError}</small>
                            </div>

                            <div className="login-container_group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                />
                                <small className="error-form text-danger">{passwordError}</small>
                            </div>
                        </form>
                        <div className="container-btn">
                            {
                                hasAccount ? (
                                    <React.Fragment>
                                        <button onClick={handleSignUp}
                                                className="login-container_button focus-none">Creat User
                                        </button>
                                        <br/>
                                        <p>Have an account? <span
                                            onClick={() => setHasAccount(!hasAccount)}>Sign In!</span></p>
                                    </React.Fragment>
                                ) : (

                                    <React.Fragment>
                                        <button onClick={handleLogin}
                                                className="login-container_button focus-none">Login
                                        </button>
                                        <br/>
                                        <p>Don't have an account? <span onClick={() => setHasAccount(!hasAccount)}>Sign Up!</span>
                                        </p>
                                    </React.Fragment>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
            <PreLoader/>
        </section>
    );
}

export default Login;