import {CREATE_PROJECT,RESET_PROJECT_CREATION} from "./actionTypes";
import axios from "../../firebaseAxios/firebaseAxios";

export function createProject(item) {
    return {
        type: CREATE_PROJECT,
        item
    }
}

export function resetProjectCreation() {
    return {
        type: RESET_PROJECT_CREATION
    }
}

export function finishCreateProject() {
    return async (dispatch, getState) => {
        await axios.post('/projects', getState().create.project)
        dispatch(resetProjectCreation())
    }
}