import axios from "../../firebaseAxios/firebaseAxios";

import {
    FETCH_PROJECT_SUCCESS,
    FETCH_PROJECT_ERROR,
    FETCH_PROJECT_START,
} from "./actionTypes";

export function fetchProjects() {
    return async dispatch => {
        dispatch(FETCH_PROJECT_START())
        try {
            const response = await axios.get('/projects.json');

            const projects = [];

            Object.keys(response.data).forEach((key, index) => {
                projects.push({
                    id: key,
                    name: `Project_${index + 1}`
                })
            });

            dispatch(FETCH_PROJECT_SUCCESS(projects))

        } catch (e) {
            dispatch(FETCH_PROJECT_ERROR(e))
        }
    }
}