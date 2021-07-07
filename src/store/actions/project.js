import axios from "../../firebaseAxios/firebaseAxios";

import {
    FETCH_PROJECTS_SUCCESS,
    FETCH_PROJECTS_ERROR,
    FETCH_PROJECTS_START,
    FETCH_PROJECT_LIST_SUCCESS,
    FETCH_PROJECT_SINGLE_SUCCESS,
    FETCH_PROJECT_CATALOG_SUCCESS,
    FETCH_CATALOG_LIST_SUCCESS,
    FETCH_CATALOG_SINGLE_SUCCESS,
    GET_CATALOG_SUCCESS,
    GET_NAVIGATION_SUCCESS,
} from "./actionTypes";

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
                            return result.push(
                                projectsList2
                            )
                        }
                    })
                }
            )

            dispatch(getProjectCategorySuccess(result))


        } catch (e) {
            let dataEmpty = []
            dispatch(getProjectCategorySuccess(dataEmpty))
            dispatch(fetchProjectsError(e))
        }


    }
}

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
/*            let lastElement = projects[projects.length - 1].name;*/
            let i = 0


/*            previous = projects[i==0?projects.length-1:i-1];
            next = projects[i==projects.length-1?0:i+1];*/

            for (let i = 0; i < projects.length; i++) {
                if (projects[i].id === navigation) {
                    previous = projects[i==0?projects.length-1:i-1].id;
                    next = projects[i==projects.length-1?0:i+1].id;

                    console.log(previous)
                    console.log(next)
/*                    if (parseInt(projects[0].name) === 1) {
                        console.log(0)
                        previous = null;
                        next = projects[i + 1].id;
                    }
                    if (parseInt(lastElement) === projects.length) {
                        console.log(4)
                        previous = projects[i - 1].id;
                        next = null;
                        break;

                    }
                    if (parseInt(projects[0].name) !== 1 || parseInt(lastElement) === projects.length) {
                        console.log("hi")

                        break;
                    }*/
/*                    previous = projects[i - 1].id;
                    next = projects[i + 1].id;*/
                }
            }

            dispatch(fetchNavigationSuccess(previous, next))

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

export function fetchProjectCategoryListSuccess(categoryList) {
    return {
        type: FETCH_CATALOG_LIST_SUCCESS,
        categoryList
    }
}

export function getProjectCategorySuccess(GetCategory) {
    return {
        type: GET_CATALOG_SUCCESS,
        GetCategory
    }
}

export function fetchSingleProjectSuccess(projectSingle) {
    return {
        type: FETCH_PROJECT_SINGLE_SUCCESS,
        projectSingle
    }
}

export function fetchSingleProjectCategorySuccess(singleCatalog) {
    return {
        type: FETCH_CATALOG_SINGLE_SUCCESS,
        singleCatalog
    }
}

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

export function fetchProjectsSuccess(projects) {
    return {
        type: FETCH_PROJECTS_SUCCESS,
        projects
    }
}

export function fetchProjectsCatalogSuccess(category) {
    return {
        type: FETCH_PROJECT_CATALOG_SUCCESS,
        category
    }
}

export function fetchProjectsError(e) {
    return {
        type: FETCH_PROJECTS_ERROR,
        error: e
    }
}
