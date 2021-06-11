import React, {Component} from 'react';
import {storage} from "../../util/firebase";
import InputFile from "../UI/InputFileAdmin/InputFile";
import Input from "../UI/InputAdmin/Input";
import TextArea from "../UI/TextAreaAdmin/TextArea"
import Button from "../UI/Button/Button";
import AdminEditorsList from "./AdminEditorsList";
import {createControl, validate, validateForm} from '../UI/form/formFramework'
import {connect} from "react-redux"
import {createProject, finishCreateProject} from "../../store/actions/create";
import Auxiliary from "../../Auxiliary/Auxiliary";
import AdminNav from "./AdminNav";
import Card from "../UI/Card/Card";

function createFormControls() {
    return {
        projectTitle: createControl({
            label: "Create Title",
            errorMessage: 'Sahifa Nomi bo\'sh bo\'lishi mumkin emas'
        }, {required: true}),
        projectText: createControl({
            label: "Create Text",
            errorMessage: 'Text bo\'sh bo\'lishi mumkin emas'
        }, {required: true}),
    }
}

class Panel extends Component {
    handleLogOut = this.props.handleLogOut

    state = {
        image: null,
        imageAdding: false,
        url: [],
        staticImage: "",
        staticImageName: "Select file",
        staticImageSize: null,
        errorImage: null,
        progress: 0,
        isFormValid: false,
        dataCreate: "",
        formControls: createFormControls()
    }

    handleChange = e => {
        let fileUrl = e.target.files[0];
        let file = e.target.files;

        console.log()
        if (file.length === 0) {
            this.setState({
                staticImage: "",
                staticImageName: "Select file",
                staticImageSize: null,
                errorImage: "File no select",
            })
        } else {
            this.setState({
                staticImage: URL.createObjectURL(fileUrl),
                staticImageName: fileUrl.name,
                staticImageSize: (fileUrl.size / 1048576).toFixed(3),
                image: e.target.files[0],
                errorImage: null,
            })
        }
    };

    handleUpload = () => {
        this.setState({
            image: null,
            staticImage: "",
            staticImageName: "Select file",
            staticImageSize: null,
        })

        let nameFile = this.state.image.name

        function encode(name) {
            return window.btoa(name);
        }

        let inputFileName = this.state.image.name,
            encoded = encode(inputFileName)

        let lowerCaseEncoded = encoded.toLowerCase();

        let nameList = lowerCaseEncoded.slice(5);

        let ext = nameFile.substr(nameFile.lastIndexOf('.') + 0);


        let filenames = nameList + ext

        const uploadTask = storage.ref(`images/${filenames}`).put(this.state.image);
        uploadTask.on(
            "state_changed",
            snapshot => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                this.setState({
                    progress: progress
                })
            },
            error => {
                console.log(error);
            },
            () => {
                storage
                    .ref("images")
                    .child(filenames)
                    .getDownloadURL()
                    .then(url => {
                        this.setState(prevState => ({
                            url: [...prevState.url, url],
                            image: null,
                            staticImage: "",
                        }))
                    });
            }
        );

    };

    submitHandler = event => {
        event.preventDefault()
    };

    createProjectHandler = event => {
        event.preventDefault();

        if (this.state.url.length === 0 ) {
            this.setState({
                staticImage: "",
                staticImageName: "Select file",
                staticImageSize: null,
                errorImage: "File no select",
            })
        } else {
            let currentdate = new Date();
            let datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth() + 1) + "/"
                + currentdate.getFullYear() + " "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds();

            const {projectTitle, projectText} = this.state.formControls;

            const projectItem = {
                projectTitle: projectTitle.value,
                projectText: projectText.value,
                projectImgUrl: this.state.url,
                createData: datetime,
                id: this.props.project.length + 1,
            };
            this.props.createProject(projectItem)

            this.setState({
                project: [],
                image: null,
                staticImage: "",
                errorImage: null,
                dataCreate: "",
                progress: 0,
                isFormValid: false,
                imageAdding: false,
                formControls: createFormControls()
            })

            this.props.finishCreateProject()
        }


    };

    changeHandler = (value, controlName) => {
        const formControls = {...this.state.formControls};
        const control = {...formControls[controlName]};

        control.touched = true;
        control.value = value;
        control.valid = validate(control.value, control.validation);

        formControls[controlName] = control;


        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })
    };

    renderProjects() {
        return this.state.url.map((projects, index) => {
            return (
                <Auxiliary key={index}>
                    { index < 3
                        ? <div className="col-md-4 " key={index}>

                            <a
                                href={projects}
                            >
                                <img className="img-thumbnail"
                                     src={projects || "https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"}
                                     alt={this.state.url || "https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"}/>
                            </a>
                        </div>
                        : <div className="col-md-4 mt-4" key={index}>

                            <a
                                href={projects}
                            >
                                <img className="img-thumbnail"
                                     src={projects || "https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"}
                                     alt={this.state.url || "https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"}/>
                            </a>
                        </div>}
                </Auxiliary>


            )
        })
    }

    renderInput = () => {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];

            return (
                <Auxiliary key={controlName + index}>
                    {
                        index === 0
                            ?
                            <Input
                                label={control.label}
                                value={control.value}
                                valid={control.valid}
                                shouldValidate={!!control.validation}
                                touched={control.touched}
                                errorMessage={control.errorMessage}
                                onChange={event => this.changeHandler(event.target.value, controlName)}
                            />
                            : <TextArea
                                label={control.label}
                                value={control.value}
                                valid={control.valid}
                                shouldValidate={!!control.validation}
                                touched={control.touched}
                                errorMessage={control.errorMessage}
                                onChange={event => this.changeHandler(event.target.value, controlName)}
                                row="10"/>}
                </Auxiliary>
            )
        })
    }

    render() {
        return (
            <section className="border-bottom">
                <div className="container">
                    <AdminNav handleLogOut={this.handleLogOut}/>

                    <AdminEditorsList/>

                    <form className="row" onSubmit={this.submitHandler}>
                        <div className="col-12">
                            <InputFile
                                legend="Slide image"
                                file={this.state.staticImage}
                                label={this.state.staticImageName}
                                size={this.state.staticImageSize}
                                errorMessage={this.state.errorImage}
                                onChange={this.handleChange}
                            />
                            <br/>
                            {
                                this.state.url.length === 0 ? <p>You have not uploaded a picture yet</p> :
                                    <div className="row">{this.renderProjects()}</div>
                            }
                            <br/>
                            <div className="progress">
                                <div className="progress-bar" style={{width: this.state.progress + "%"}}
                                     aria-valuenow="0"
                                     aria-valuemin="0" aria-valuemax="100"/>
                            </div>
                            <br/>
                            <Button
                                type="primary"
                                onClick={this.handleUpload}
                                disabled={!this.state.image}
                            >
                                Image upload
                            </Button>
                            <br/>
                            <br/>
                            {

                                this.state.imageAdding === false
                                    ? <React.Fragment>{this.renderInput()}</React.Fragment> : <p>Adding image</p>

                            }

                            <br/>

                            <Button
                                type="success"
                                className="btn"
                                onClick={this.createProjectHandler}
                                disabled={!this.state.isFormValid}
                            >
                                Project Create
                            </Button>
                            <br/>
                            <br/>
                        </div>
                    </form>

                    <div className="row">
                        <Card
                            cardUrl={this.props.project.projectImgUrl}
                            cardTitle={this.props.project.projectTitle}
                            cardText={this.props.project.projectText}
                            cardDataCreate={this.props.project.createData}
                        />
                    </div>
                </div>

            </section>
        );
    }
}

function mapStateToProps(state) {
    return {
        project: state.create.project
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createProject: item => dispatch(createProject(item)),
        finishCreateProject: () => dispatch(finishCreateProject()),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Panel);