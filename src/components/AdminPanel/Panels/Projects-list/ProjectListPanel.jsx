import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import Card from "../../../UI/Card/Card";
import Loader from "../../../UI/Loader/Loader";
import add from "../../../../assets/img/icons/add.png";
import {fetchProjectById, fetchProjects} from "../../../../store/actions/project";
import {connect} from "react-redux";
import ProjectsDataService from "../../../../util/projects.service";
    
class ProjectListPanel extends Component {

    deleteTutorial(props) {
        ProjectsDataService.delete(props)
            .then(() => {
                return this.props.fetchProjectById()
            })
            .catch((e) => {
                console.log(e);
            });
    }

    renderProjects(props) {
        return this.props.projectList.map((projectsList, index) => {
            return (
                <React.Fragment key={index}>
                    <div  className="col-md-4 mt-4 d-flex flex-column">
                        <NavLink to={"/slider-project/" + props[index]}>
                            <Card
                                cardUrl={projectsList.projectImgUrl[0]}
                                cardTitle={projectsList.projectTitle}
                                cardText={projectsList.projectText}
                                cardDataCreate={projectsList.createData}
                            />
                        </NavLink>
                        <button onClick={() => this.deleteTutorial(props[index])}>Remove Slider</button>
                    </div>
                </React.Fragment>
            )
        })
    }

    componentDidMount() {
        this.props.fetchProjects()
        this.props.fetchProjectById()
    }

    componentDidUpdate(){
        return this.props.projectList
    }
    render() {
        const link = this.props.projectsUrl.map((projectsUrl) => {
            return projectsUrl.id
        })

        return (
            <div>


                <h1>Slider Projects</h1>
                {
                    this.props.loading && this.props.length !== 0
                        ? <Loader/>
                        : <div className="row">
                            {this.renderProjects(link)}
                            <div className="col-md-4 mt-4">
                                <NavLink to={"/project-catalog-add"}
                                         className="border rounded d-flex align-items-center justify-content-center pl-2 pt-2">
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
        projectsUrl: state.project.projects,
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

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListPanel);
