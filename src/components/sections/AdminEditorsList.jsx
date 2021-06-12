import React, {Component} from "react";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import Loader from "../UI/Loader/Loader";
import {fetchProjectById, fetchProjects} from "../../store/actions/project";
import Card from "../UI/Card/Card";
import add from "../../assets/img/icons/add.png"

class AdminEditorsList extends Component {
    renderProjects(props) {
        return this.props.projectList.map((projectsList, index) => {
            return (
                <React.Fragment key={index}>
                    <NavLink to={"/login/projects" + props[index]} className="col-md-4 mt-4">
                        <Card
                            cardUrl={projectsList.projectImgUrl[0]}
                            cardTitle={projectsList.projectTitle}
                            cardText={projectsList.projectText}
                            cardDataCreate={projectsList.createData}
                        />
                    </NavLink>
                </React.Fragment>
            )
        })
    }

    componentDidMount() {
        this.props.fetchProjects()
        this.props.fetchProjectById()

    }

    render() {

        const link = this.props.projects.map((projectsUrl) => {
            return projectsUrl.path
        })

        return (
            <div>
                <h1>Slider Projects</h1>
                {
                    this.props.loading && this.props.length !== 0
                        ? <Loader/>
                        : <div className="row">{this.renderProjects(link)}
                            <div
                                className="col-md-4 mt-4">
                                <NavLink to={"/login/projects/add-slider"} className="border rounded d-flex align-items-center justify-content-center pl-2 pt-2">
                                    <img src={add} style={{width: 150}} alt="icon-add"/>
                                </NavLink>
                            </div>
                        </div>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        projects: state.project.projects,
        projectList: state.project.projectList,
        loading: state.project.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchProjects: () => dispatch(fetchProjects()),
        fetchProjectById: () => dispatch(fetchProjectById()),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AdminEditorsList);
