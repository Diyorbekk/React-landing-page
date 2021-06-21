import {
    CREATE_PROJECT,
    CREATE_PROJECT_CATALOG,
    RESET_PROJECT_CREATION,
    RESET_PROJECT_CREATION_CATALOG,
} from "./actionTypes";
import axios from "../../firebaseAxios/firebaseAxios";

export function createProject(item) {
    return {
        type: CREATE_PROJECT,
        item
    }
}

export function createProjectCatalog(item) {
    return {
        type: CREATE_PROJECT_CATALOG,
        item
    }
}

export function resetProjectCreation() {
    return {
        type: RESET_PROJECT_CREATION
    }
}
export function resetProjectCreationCatalog() {
    return {
        type: RESET_PROJECT_CREATION_CATALOG
    }
}

export function finishCreateCatalogProject() {
    return async (dispatch, getState) => {
        await axios.post('/projects-catalog.json', getState().create.project)
        dispatch(resetProjectCreationCatalog())
    }
}

export function finishCreateProject() {
    return async (dispatch, getState) => {
        await axios.post('/projects.json', getState().create.project)
        dispatch(resetProjectCreation())
    }
}