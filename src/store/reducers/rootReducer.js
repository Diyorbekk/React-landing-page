import {combineReducers} from "redux";
import projectsReducer from "./project";
import createReducer from "./create";
import authReducer from "./auth";

export default combineReducers({
    project: projectsReducer,
    create: createReducer,
    auth: authReducer
})