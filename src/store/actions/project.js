import axios from "../../firebaseAxios/firebaseAxios";

import {
    FETCH_PROJECTS_SUCCESS,
    FETCH_PROJECTS_ERROR,
    FETCH_PROJECTS_START,
    FETCH_PROJECT_LIST_SUCCESS,
} from "./actionTypes";

export function fetchProjects() {
    return async dispatch => {
        dispatch(fetchProjectsStart())
        try {
            const response = await axios.get('/projects.json');

            const projects = [];


            Object.keys(response.data).forEach((key, index) => {
                projects.push({
                    path: key,
                    id: `${index + 1}`,
                })
            });

            dispatch(fetchProjectsSuccess(projects))


        } catch (e) {
            dispatch(fetchProjectsError(e))
        }
    }
}

export function fetchProjectById() {

    return async dispatch => {
        dispatch(fetchProjectsStart())
        try {
            const response = await axios.get(`/projects.json`);

            const projectKeys = response.data
            const propOwn = Object.getOwnPropertyNames(projectKeys);
            const projectsTik = []
            let projectList = []
            let i = 0
            let result = []

            for (const key of propOwn) {
                i++
                projectsTik[key] = await axios.get(`/projects/${key}.json`);
                projectList.push({
                    data: projectsTik[key].data,
                    path: key,
                    id: i,
                })
            }

            projectList.map(project => {
                return project.data.map(projectsList2 => {
                    return result.push(
                            projectsList2
                        )
                    })
                }
            )


            dispatch(fetchProjectListSuccess(result))


        } catch (e) {
            dispatch(fetchProjectsError(e))
        }


    }
}

export function fetchProjectListSuccess(projectList) {
    return {
        type: FETCH_PROJECT_LIST_SUCCESS,
        projectList
    }
}

export function fetchProjectsStart() {
    return {
        type: FETCH_PROJECTS_START
    }
}

export function fetchProjectsSuccess(projects) {
    return {
        type: FETCH_PROJECTS_SUCCESS,
        projects
    }
}

export function fetchProjectsError(e) {
    return {
        type: FETCH_PROJECTS_ERROR,
        error: e
    }
}
