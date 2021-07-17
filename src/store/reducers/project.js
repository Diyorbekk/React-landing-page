import {
    FETCH_PROJECT_LIST_SUCCESS,
    FETCH_PROJECTS_SUCCESS,
    FETCH_PROJECTS_ERROR,
    FETCH_PROJECTS_START,
    PROJECT_NEXT,
    FINISH_PROJECT,
    FETCH_PROJECT_SINGLE_SUCCESS,
    FETCH_PROJECT_CATALOG_SUCCESS,
    FETCH_CATALOG_LIST_SUCCESS,
    FETCH_CATALOG_SINGLE_SUCCESS, GET_CATALOG_SUCCESS, GET_NAVIGATION_SUCCESS, FETCH_NEWS_SUCCESS, FETCH_NEWS_NAVIGATOR,
} from "../actions/actionTypes";


const initialState = {
    projects: [],
    category: [],
    GetCategory: [],
    news: [],
    projectSingle: null,
    newsPage: null,
    singleCatalog: null,
    projectList: [],
    categoryList: [],
    previous: null,
    next: null,
    activeProject: 0,
    loading: false,
    isFinished: false,
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
        case FETCH_PROJECT_CATALOG_SUCCESS:
            return {
                ...state, loading: false, category: action.category
            }
        case FETCH_PROJECTS_ERROR:
            return {
                ...state, loading: false, error: action.error
            }
        case FETCH_PROJECT_SINGLE_SUCCESS:
            return {
                ...state, loading: false, projectSingle: action.projectSingle
            }
        case FETCH_CATALOG_SINGLE_SUCCESS:
            return {
                ...state, loading: false, singleCatalog: action.singleCatalog
            }
        case FETCH_PROJECT_LIST_SUCCESS:
            return {
                ...state, loading: false, projectList: action.projectList
            }
        case FETCH_CATALOG_LIST_SUCCESS:
            return {
                ...state, loading: false, categoryList: action.categoryList
            }
        case GET_CATALOG_SUCCESS:
            return {
                ...state, loading: false, GetCategory: action.GetCategory
            }
        case FETCH_NEWS_SUCCESS:
            return {
                ...state, loading: false, news: action.news
            }
        case FETCH_NEWS_NAVIGATOR:
            return {
                ...state, loading: false, newsPage: action.newsPage
            }
        case GET_NAVIGATION_SUCCESS:
            return {
                ...state, loading: false, previous: action.previous, next: action.next
            }
        case FINISH_PROJECT: {
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