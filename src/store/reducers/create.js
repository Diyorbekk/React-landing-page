import {
    CREATE_CLIENTS,
    CREATE_NEWS,
    CREATE_PROJECT,
    CREATE_PROJECT_CATALOG, RESET_CLIENTS, RESET_NEWS,
    RESET_PROJECT_CREATION,
    RESET_PROJECT_CREATION_CATALOG
} from "../actions/actionTypes";

const initialState = {
    project: [],
    category: [],
    news: [],
    clients: []
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
        case CREATE_NEWS:
            return{
                ...state,
                news: [...state.news, action.item]
            }
        case RESET_NEWS:
            return {
                ...state,
                news: []
            }
        case CREATE_CLIENTS:
            return{
                ...state,
                clients: [...state.clients, action.item]
            }
        case RESET_CLIENTS:
            return {
                ...state,
                clients: []
            }
        default:
            return state
    }
}