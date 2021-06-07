import {CREATE_PROJECT,RESET_PROJECT_CREATION} from "../actions/actionTypes";

const initialState = {
    project: []
}

export default function createReducer(state= initialState,action) {
    switch (action.type) {
        case CREATE_PROJECT:
            return{
                ...state,
                project: [...state.project, action.item]
            }
        case RESET_PROJECT_CREATION:
            return {
                ...state,
                project: []
            }
        default:
            return state
    }
}