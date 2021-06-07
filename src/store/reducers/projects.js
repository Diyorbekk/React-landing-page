import {
    FETCH_PROJECT_SUCCESS,
    FETCH_PROJECT_ERROR,
    FETCH_PROJECT_START,
} from "../actions/actionTypes";


const initialState = {
    projects: [],
    loading: false,
    error: null,
}

export default function quizReducer(state = initialState, action) {

    switch (action.type) {
        case FETCH_PROJECT_START:
            return {
                ...state, loading: true
            }
        case FETCH_PROJECT_SUCCESS:
            return {
                ...state, loading: false, quizes: action.quizes
            }
        case FETCH_PROJECT_ERROR:
            return {
                ...state, loading: false, error: action.error
            }


        default:
            return state
    }
}