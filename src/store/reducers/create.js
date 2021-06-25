import {
    CREATE_PROJECT,
    CREATE_PROJECT_CATALOG,
    RESET_PROJECT_CREATION,
    RESET_PROJECT_CREATION_CATALOG
} from "../actions/actionTypes";

const initialState = {
    project: [],
    category: []
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
        case CREATE_PROJECT_CATALOG:
            return{
                ...state,
                category: [...state.category, action.item]
            }
        case RESET_PROJECT_CREATION_CATALOG:
            return {
                ...state,
                category: []
            }
        default:
            return state
    }
}