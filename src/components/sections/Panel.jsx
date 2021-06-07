import React, {Component} from 'react';
import {storage} from "../../util/firebase";
import InputFile from "../UI/InputFileAdmin/InputFile";
import Input from "../UI/InputAdmin/Input";
import TextArea from "../UI/TextAreaAdmin/TextArea"
import Button from "../UI/Button/Button";
import {createControl, validate, validateForm} from '../UI/form/formFramework'
import {connect} from "react-redux"
import $ from "jquery";
import {createProject, finishCreateProject} from "../../store/actions/create";
import Auxiliary from "../../Auxiliary/Auxiliary";

function createOptionControl(number) {
    return createControl({
        errorMessage: 'Qiymat bo\'sh bo\'lishi mumkin emas',
        id: number
    }, {required: true})
}

function createFormControls() {
    return {
        projectImage: createControl({
            errorMessage: 'Rasm bo\'sh bo\'lishi mumkin emas'
        }, {required: true}),
        projectTitle: createOptionControl(1),
        projectText: createOptionControl(2),
    }
}

class Panel extends Component {
    const [image, setImage] = useState(null)
    const [url, setUrl] = useState("");
    const [staticImage, setStaticImage] = useState("");
    const [progress, setProgress] = useState(0);
    const [isFormValid, SetIsFormValid] = useState(false);
    const [formControls, setFormControls] = useState(createFormControls())

    let currentdate = new Date();
    let datetime = currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + " "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();


    const handleChange = e => {
        let label = $("#images").parent().find('span');
        let fileValue = document.getElementById("images");
        let file = e.target.files[0];
        let name = file.name;
        let size = (file.size / 1048576).toFixed(3); //size in mb
        setStaticImage(URL.createObjectURL(file))
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
            label.addClass('withFile').text(name + ' (' + size + 'mb)');
        } else {
            let name = fileValue.value.split("\\");
            label.addClass('withFile').text(name[name.length - 1]);
        }

    };

    const submitHandler = event => {
        event.preventDefault()
    };

    const addProjectHandler = event => {
        event.preventDefault();

        const {projectImage, projectTitle, projectText} = formControls;

        const questionItem = {
            projectImage: projectImage.value,
            projectTitle: projectTitle.value,
            projectText: projectText.value,
            id: this.props.project.length + 1,
        };

        this.props.createProject(questionItem)

        SetIsFormValid(isFormValid, false)
        setFormControls(createFormControls())
    };

    const createProjectHandler = event => {
        event.preventDefault();

        this.setState({
            project: [],
        })
        SetIsFormValid(isFormValid, false)
        setFormControls(createFormControls())

        this.props.finishCreateProject()
    };

    const changeHandler = (value, controlName) => {
        const formControls = {...formControls};
        const control = {...formControls[controlName]};

        control.touched = true;
        control.value = value;
        control.valid = validate(control.value, control.validation);

        formControls[controlName] = control;

        setFormControls(formControls)
        SetIsFormValid(validateForm(formControls))
    };


    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            snapshot => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            error => {
                console.log(error);
            },
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        setUrl(url);
                    });
            }
        );
    };

    const renderInput = () => {
        return Object.keys(formControls).map((controlName, index) => {
            const control = formControls[controlName];

            return (
                <Auxiliary key={controlName + index}>
                    <Input
                        label="Title"
                        value={control.value}
                        valid={control.valid}
                        shouldValidate={!!control.validation}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        onChange={event => changeHandler(event.target.value, controlName)}
                    />
                </Auxiliary>
            )
        })
    }

    const renderTextArea = () => {
        return Object.keys(formControls).map((controlName, index) => {
            const control = formControls[controlName];

            return (
                <Auxiliary key={controlName + index}>
                    <TextArea
                        label="Text"
                        value={control.value}
                        valid={control.valid}
                        shouldValidate={!!control.validation}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        onChange={event => changeHandler(event.target.value, controlName)}
                        row="10"/>
                </Auxiliary>
            )
        })
    }

    return (
        <section className="border-bottom">
            <div className="container">
                <nav className="d-flex justify-content-between align-items-center py-3">
                    <div className="menu">
                        <button className="btn menu focus-none rounded">
                            <span className="icon-bar"><i className="ti-line-double"/></span>
                        </button>
                    </div>

                    <h2 className="mb-0">Admin Panel</h2>
                    <div className="dropdown">
                        <button className="btn focus-none dropdown-toggle" type="button" id="dropdownMenuButton"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Dropdown button
                        </button>
                        <div className="dropdown-menu border" aria-labelledby="dropdownMenuButton">
                            <button className="dropdown-item" onClick={handleLogOut}>Log out</button>
                        </div>
                    </div>
                </nav>

                <form className="row" onSubmit={submitHandler}>
                    <div className="col-12">
                        <InputFile legend="Slide image" file={staticImage} label="Select file" onChange={handleChange}/>
                        <br/>
                        {renderInput()}
                        <br/>
                        {renderTextArea()}
                        <br/>
                        <button className="btn btn-outline-secondary" onClick={handleUpload}>Upload</button>
                        <br/>
                        <br/>
                        <div className="progress">
                            <div className="progress-bar" style={{width: progress + "%"}} aria-valuenow="0"
                                 aria-valuemin="0" aria-valuemax="100"/>
                        </div>
                        <br/>
                        {
                            url
                                ? <p className="animated fadeInDown">Your link: <a href={url || null}>Image</a></p>
                                : <p className="animated fadeInDown">You have not uploaded a picture yet</p>
                        }

                        <br/>
                    </div>
                    <div className="col-md-4">
                        <div className="card mb-3">
                            <img
                                src={url || "https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"}
                                className="card-img-top" alt={url}/>
                            <div className="card-body">
                                <h5 className="card-title">Card title</h5>
                                <p className="card-text">This is a wider card with supporting text below as a natural
                                    lead-in to additional content. This content is a little bit longer.</p>
                                <p className="card-text">
                                    <small className="text-muted">Last updated {datetime}</small>
                                </p>
                            </div>
                        </div>
                    </div>

                    <Button
                        type="primary"
                        onClick={addProjectHandler}
                        disabled={!isFormValid}
                    >
                        Savolni qo'shish
                    </Button>

                    <Button
                        type="success"
                        onClick={createProjectHandler}
                        disabled={project.length === 0}
                    >
                        Savol yaratish
                    </Button>
                </form>

            </div>
        </section>
    );
}

function mapStateToProps(state) {
    return {
        project: state.create.project
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createProject: item => dispatch(createProject(item)),
        finishCreateProject: () => dispatch(finishCreateProject())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Panel);