import {combineReducers} from "redux";
import projectsReducer from "./project";
import createReducer from "./create";

export default combineReducers({
    project: projectsReducer,
    create: createReducer,
})