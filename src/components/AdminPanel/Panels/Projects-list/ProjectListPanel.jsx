import React, {Component} from "react";
import {Link, NavLink} from "react-router-dom";
import Card from "../../../UI/Card/Card";
import Loader from "../../../UI/Loader/Loader";
import add from "../../../../assets/img/icons/add.png";
import {fetchProjectCatalogById, fetchProjectsCatalog} from "../../../../store/actions/project";
import {connect} from "react-redux";
import CategoryDataService from "../../../../util/category.service";

class ProjectListPanel extends Component {

    deleteTutorial(props) {
        CategoryDataService.delete(props)
            .then(() => {
                return this.props.fetchProjectCatalogById()
            })
            .catch((e) => {
                console.log(e);
            });
    }

    renderProjects(props) {
        return this.props.categoryList.map((projectsList, index) => {
            return (
                <React.Fragment key={index}>
                    <div className="col-md-4 mt-4 d-flex flex-column">
                        <Link to={"/catalog-project/" + props[index]}>
                            {
                                projectsList.categoryData.map((listCategory, number) => {
                                    return (
                                        <Card
                                            key={number}
                                            cardUrl={listCategory.projectImgUrl[0]}
                                            cardTitle={listCategory.projectTitle}
                                            cardCategory={projectsList.categoryName}
                                            cardText={listCategory.projectText}
                                            cardDataCreate={listCategory.createData}
                                        />
                                    )
                                })
                            }

                        </Link>
                        <button onClick={() => this.deleteTutorial(props[index])}>Remove Slider</button>
                    </div>
                </React.Fragment>
            )
        })


    }

    componentDidMount() {
        this.props.fetchProjectsCatalog()
        this.props.fetchProjectCatalogById()
    }

    componentDidUpdate() {
        return this.props.categoryList
    }

    render() {
        const link = this.props.categoryUrl.map((projectsUrl) => {
            return projectsUrl.id
        })

        return (
            <div>


                <h1>Projects Catalog</h1>
                {
                    this.props.loading && this.props.length !== 0
                        ? <Loader/>
                        : <React.Fragment>
                            <div className="row">
                                {this.renderProjects(link)}
                                <div className="col-md-4 mt-4">
                                <NavLink to={"/project-catalog-add"}
                                         className="border rounded d-flex align-items-center justify-content-center pl-2 pt-2">
                                    <img src={add} style={{width: 150}} alt="icon-add"/>
                                </NavLink>
                            </div></div>

                        </React.Fragment>
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        categoryUrl: state.project.category,
        categoryList: state.project.categoryList,
        loading: state.project.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchProjectsCatalog: () => dispatch(fetchProjectsCatalog()),
        fetchProjectCatalogById: () => dispatch(fetchProjectCatalogById()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListPanel);
