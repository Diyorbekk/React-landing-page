import {
    FETCH_PROJECT_SUCCESS,
    FETCH_PROJECTS_SUCCESS,
    FETCH_PROJECTS_ERROR,
    FETCH_PROJECTS_START,
    PROJECT_NEXT, FINISH_PROJECT,
} from "../actions/actionTypes";


const initialState = {
    projects: [],
    project: null,
    activeProject: 0,
    isFinished: false,
    loading: false,
    error: null,
}

export default function quizReducer(state = initialState, action) {

    switch (action.type) {
        case FETCH_PROJECTS_START:
            return {
                ...state, loading: true
            }
        case FETCH_PROJECTS_SUCCESS:
            return {
                ...state, loading: false, projects: action.projects
            }
        case FETCH_PROJECTS_ERROR:
            return {
                ...state, loading: false, error: action.error
            }
        case FETCH_PROJECT_SUCCESS:
            return {
                ...state, loading: false, project: action.project
            }

        case FINISH_PROJECT:{
            return {
                ...state, isFinished: true
            }
        }
        case PROJECT_NEXT: {
            return {
                ...state, activeProject: action.number
            }
        }


        default:
            return state
    }
}