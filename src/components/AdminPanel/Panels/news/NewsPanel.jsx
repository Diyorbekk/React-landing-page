import React, {Component} from "react";
import {Link, NavLink} from "react-router-dom";
import add from "../../../../assets/img/icons/add.png";
import {fetchNews} from "../../../../store/actions/project";
import {connect} from "react-redux";
import Loader from "../../../UI/Loader/Loader";
import Card from "../../../UI/Card/Card";
import NewsDataService from "../../../../util/news.service";


class NewsPanel extends Component {
    deleteTutorial(props) {
        NewsDataService.delete(props)
            .then(() => {
                return this.props.fetchNews()
            })
            .catch((e) => {
                console.log(e);
            });
    }

    renderProjects() {
        return this.props.newsList.map((projectsList, index) => {
            console.log(projectsList.path)
            return (
                <React.Fragment key={index}>
                    <div className="col-md-4 mt-4 d-flex flex-column">
                        <Link to={"/news-single/" + projectsList.path}>
                            {
                                <Card
                                    key={index}
                                    cardUrl={projectsList.data.projectImgUrl[0]}
                                    cardTitle={projectsList.data.projectTitle}
                                    cardCategory={projectsList.data.categoryName}
                                    cardText={projectsList.data.projectText}
                                    cardDataCreate={projectsList.data.createData}
                                />
                            }

                        </Link>
                        <button onClick={() => this.deleteTutorial(projectsList.path)}>Remove Catalog</button>
                    </div>
                </React.Fragment>
            )
        })


    }

    componentDidMount() {
        this.props.fetchNews()
    }

    render() {
        return (
            <div>
                <h1>News Projects</h1>
                {
                    this.props.loading && this.props.length !== 0
                        ? <Loader/>
                        : <React.Fragment>
                            <div className="row">
                                {this.renderProjects()}
                                <div className="col-md-4 mt-4">
                                    <NavLink to={"/news-add"}
                                             className="border rounded d-flex align-items-center justify-content-center pl-2 pt-2">
                                        <img src={add} style={{width: 150}} alt="icon-add"/>
                                    </NavLink>
                                </div>
                            </div>
                        </React.Fragment>
                }

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        newsList: state.project.news,
        loading: state.project.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchNews: () => dispatch(fetchNews()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsPanel);
