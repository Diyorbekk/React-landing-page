import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import reportWebVitals from './reportWebVitals';
import {createStore,compose,applyMiddleware} from 'redux'
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./store/reducers/rootReducer";

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        }) : compose;


const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);

ReactDOM.render(
    <React.Fragment>
        <Provider store={store}>
            <BrowserRouter>

                <App/>
            </BrowserRouter>
        </Provider>
    </React.Fragment>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
