import {combineReducers} from "redux";
import projectsReducer from "./projects";
import createReducer from "./create";

export default combineReducers({
    projects: projectsReducer,
    create: createReducer,
})