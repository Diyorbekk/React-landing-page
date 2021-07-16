import axios from "../../firebaseAxios/firebaseAxios";

import {
    FETCH_CATALOG_LIST_SUCCESS,
    FETCH_CATALOG_SINGLE_SUCCESS,
    FETCH_PROJECT_CATALOG_SUCCESS,
    FETCH_PROJECT_LIST_SUCCESS,
    FETCH_PROJECT_SINGLE_SUCCESS,
    FETCH_PROJECTS_ERROR,
    FETCH_PROJECTS_START,
    FETCH_PROJECTS_SUCCESS,
    GET_CATALOG_SUCCESS,
    GET_NAVIGATION_SUCCESS,
    FETCH_NEWS_SUCCESS,
} from "./actionTypes";

// Function Axios


// Projects json
export function fetchProjects() {
    return async dispatch => {
        dispatch(fetchProjectsStart())
        try {
            const response = await axios.get('/projects.json');

            const projects = [];


            Object.keys(response.data).forEach((key, index) => {
                projects.push({
                    id: key,
                    name: `${index + 1}`,
                })
            });

            dispatch(fetchProjectsSuccess(projects))


        } catch (e) {
            dispatch(fetchProjectsError(e))
        }
    }
}
// Category json
export function fetchProjectsCatalog() {
    return async dispatch => {
        dispatch(fetchProjectsStart())
        try {
            const response = await axios.get('/category.json');

            const category = [];


            Object.keys(response.data).forEach((key, index) => {
                category.push({
                    id: key,
                    name: `${index + 1}`,
                })
            });
            dispatch(fetchProjectsCatalogSuccess(category))


        } catch (e) {
            dispatch(fetchProjectsError(e))
        }
    }
}
// Projects ID json
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
            let dataEmpty = []
            dispatch(fetchProjectListSuccess(dataEmpty))
            dispatch(fetchProjectsError(e))
        }


    }
}
// Category ID json
export function fetchProjectCatalogById() {

    return async dispatch => {
        dispatch(fetchProjectsStart())
        try {
            const response = await axios.get(`/category.json`);

            const categoryKeys = response.data
            const propOwn = Object.getOwnPropertyNames(categoryKeys);
            const projectsTik = []
            let projectList = []
            let i = 0
            let result = []

            for (const key of propOwn) {
                i++
                projectsTik[key] = await axios.get(`/category/${key}.json`);
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
            dispatch(fetchProjectCategoryListSuccess(result))


        } catch (e) {
            let dataEmpty = []
            dispatch(fetchProjectCategoryListSuccess(dataEmpty))
            dispatch(fetchProjectsError(e))
        }


    }
}
// Category ID Return json
export function getProjectCategory(getCategoriesReturnType) {

    return async dispatch => {
        dispatch(fetchProjectsStart())
        try {
            const response = await axios.get(`/category.json`);

            const categoryKeys = response.data
            const propOwn = Object.getOwnPropertyNames(categoryKeys);
            const projectsTik = []
            let projectList = []
            let i = 0
            let result = []

            for (const key of propOwn) {
                i++
                projectsTik[key] = await axios.get(`/category/${key}.json`);
                projectList.push({
                    data: projectsTik[key].data,
                    path: key,
                    id: i,
                })
            }


            projectList.map(project => {
                    // eslint-disable-next-line
                    return project.data.map(projectsList2 => {
                        // eslint-disable-next-line
                        if (projectsList2.category == getCategoriesReturnType) {
                            return result.push({
                                data: projectsList2,
                                path: project.path
                            })
                        }
                    })
                }
            )

            if (result.length === 0) {
                result = null
            }
            dispatch(getProjectCategorySuccess(result))


        } catch (e) {
            let dataEmpty = []
            dispatch(getProjectCategorySuccess(dataEmpty))
            dispatch(fetchProjectsError(e))
        }


    }
}
// Projects ID Return json
export function fetchProjectByUrl(projectUrl) {
    return async dispatch => {
        dispatch(fetchProjectsStart())

        try {
            const response = await axios.get(`/projects/${projectUrl}.json`);


            const projectSingle = response.data;

            dispatch(fetchSingleProjectSuccess(projectSingle))

        } catch (e) {
            dispatch(fetchProjectsError(e))
        }

    }
}
// Category ID URL Return json
export function fetchProjectCatalogByUrl(projectUrl) {
    return async dispatch => {
        dispatch(fetchProjectsStart())

        try {
            const response = await axios.get(`/category/${projectUrl}.json`);

            const singleCatalog = response.data;

            dispatch(fetchSingleProjectCategorySuccess(singleCatalog))

        } catch (e) {
            dispatch(fetchProjectsError(e))
        }

    }
}
// Category ID NAVIGATOR Return json
export function fetchNextAndPrev(navigation) {
    return async dispatch => {
        dispatch(fetchProjectsStart())
        try {
            const response = await axios.get(`/category.json`);
            const projects = []
            Object.keys(response.data).forEach((key, index) => {
                projects.push({
                    id: key,
                    name: `${index + 1}`,
                })
            });

            let previous = null
            let next = null
            let lastElement = projects[projects.length - 1].id;
            let firstElement = projects[0].id;

            for (let i = 0; i < projects.length; i++) {
                if (projects[i].id === navigation) {

                    // eslint-disable-next-line
                    previous = projects[i == 0 ? projects.length - 1 : i - 1].id;
                    // eslint-disable-next-line
                    next = projects[i == projects.length - 1 ? 0 : i + 1].id;
                    if (firstElement === navigation) {
                        previous = null;
                        // eslint-disable-next-line
                        next = projects[i == projects.length - 1 ? 0 : i + 1].id;
                    }

                    if (lastElement === navigation) {
                        // eslint-disable-next-line
                        previous = projects[i == 0 ? projects.length - 1 : i - 1].id;
                        next = null;
                    }
                }
            }

            dispatch(fetchNavigationSuccess(previous, next))

        } catch (e) {
            dispatch(fetchProjectsError(e))
        }

    }
}
// News json
export function fetchNews(navigation) {
    return async dispatch => {
        dispatch(fetchProjectsStart())
        try {
            const response = await axios.get('/news.json');
            const news = [];
            Object.keys(response.data).forEach((key, index) => {
                news.push({
                    id: key,
                    name: `${index + 1}`,
                })
            });

            console.log(navigation)

            if (typeof(navigation) != "undefined"){
                const response = await axios.get(`/news/${navigation}.json`);

                const singleCatalog = response.data;

                let previous = null
                let next = null
                let lastElement = news[news.length - 1].id;
                let firstElement = news[0].id;

                for (let i = 0; i < news.length; i++) {
                    if (news[i].id === navigation) {

                        // eslint-disable-next-line
                        previous = news[i == 0 ? news.length - 1 : i - 1].id;
                        // eslint-disable-next-line
                        next = news[i == news.length - 1 ? 0 : i + 1].id;
                        if (firstElement === navigation) {
                            previous = null;
                            // eslint-disable-next-line
                            next = news[i == news.length - 1 ? 0 : i + 1].id;
                        }

                        if (lastElement === navigation) {
                            // eslint-disable-next-line
                            previous = news[i == 0 ? news.length - 1 : i - 1].id;
                            next = null;
                        }
                    }
                }


                dispatch(fetchNewsSuccess(singleCatalog))
                dispatch(fetchNavigationSuccess(previous, next))
            }else {
                const categoryKeys = response.data
                const propOwn = Object.getOwnPropertyNames(categoryKeys);
                const projectsTik = []
                let projectList = []
                let i = 0
                let result = []

                for (const key of propOwn) {
                    i++
                    projectsTik[key] = await axios.get(`/news/${key}.json`);
                    projectList.push({
                        data: projectsTik[key].data,
                        path: key,
                        id: i,
                    })
                }

                projectList.map(project => {
                        return project.data.map(projectsList2 => {
                            return result.push({
                                data: projectsList2,
                                path: project.path
                            })
                        })
                    }
                )
                dispatch(fetchNewsSuccess(result))
            }
        } catch (e) {
            let dataEmpty = []
            dispatch(fetchNewsSuccess(dataEmpty))
            dispatch(fetchProjectsError(e))
        }
    }
}

// Function Actions


// Projects ID json
export function fetchProjectListSuccess(projectList) {
    return {
        type: FETCH_PROJECT_LIST_SUCCESS,
        projectList
    }
}

// Category ID json
export function fetchProjectCategoryListSuccess(categoryList) {
    return {
        type: FETCH_CATALOG_LIST_SUCCESS,
        categoryList
    }
}

// Category ID Return json
export function getProjectCategorySuccess(GetCategory) {
    return {
        type: GET_CATALOG_SUCCESS,
        GetCategory
    }
}

// Projects ID Return json
export function fetchSingleProjectSuccess(projectSingle) {
    return {
        type: FETCH_PROJECT_SINGLE_SUCCESS,
        projectSingle
    }
}

// Category ID URL Return json
export function fetchSingleProjectCategorySuccess(singleCatalog) {
    return {
        type: FETCH_CATALOG_SINGLE_SUCCESS,
        singleCatalog
    }
}

// Category ID NAVIGATOR Return json
export function fetchNavigationSuccess(previous, next) {
    return {
        type: GET_NAVIGATION_SUCCESS,
        previous,
        next
    }
}

export function fetchProjectsStart() {
    return {
        type: FETCH_PROJECTS_START
    }
}

// Projects json
export function fetchProjectsSuccess(projects) {
    return {
        type: FETCH_PROJECTS_SUCCESS,
        projects
    }
}

// Category json
export function fetchProjectsCatalogSuccess(category) {
    return {
        type: FETCH_PROJECT_CATALOG_SUCCESS,
        category
    }
}

// News json
export function fetchNewsSuccess(news) {
    return {
        type: FETCH_NEWS_SUCCESS,
        news
    }
}

export function fetchProjectsError(e) {
    return {
        type: FETCH_PROJECTS_ERROR,
        error: e
    }
}
