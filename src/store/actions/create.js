import {
    CREATE_CLIENTS,
    CREATE_NEWS,
    CREATE_PROJECT,
    CREATE_PROJECT_CATALOG, RESET_CLIENTS,
    RESET_NEWS,
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

export function createNews(item) {
    return {
        type: CREATE_NEWS,
        item
    }
}

export function createClientsSay(item) {
    return {
        type: CREATE_CLIENTS,
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

export function resetNews() {
    return {
        type: RESET_NEWS
    }
}
export function resetClientsSay() {
    return {
        type: RESET_CLIENTS
    }
}

export function finishCreateCatalogProject() {
    return async (dispatch, getState) => {
        await axios.post('/category.json', getState().create.category)
        dispatch(resetProjectCreationCatalog())
    }
}

export function finishCreateProject() {
    return async (dispatch, getState) => {
        await axios.post('/projects.json', getState().create.project)
        dispatch(resetProjectCreation())
    }
}

export function finishCreateNews() {
    return async (dispatch, getState) => {
        await axios.post('/news.json', getState().create.news)
        dispatch(resetNews())
    }
}

export function finishCreateClientsSay() {
    return async (dispatch, getState) => {
        await axios.post('/news.json', getState().create.clients)
        dispatch(resetClientsSay())
    }
}