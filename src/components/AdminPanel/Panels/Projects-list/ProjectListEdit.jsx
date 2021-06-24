import React, {Component} from "react";
import InputFile from "../../../UI/InputFileAdmin/InputFile";
import Button from "../../../UI/Button/Button";
import TextArea from "../../../UI/TextAreaAdmin/TextArea";
import {createControl, validate, validateForm} from "../../../UI/form/formFramework";
import $ from "jquery";
import {storage} from "../../../../util/firebase";
import {createProjectCatalog, finishCreateCatalogProject} from "../../../../store/actions/create";
import {connect} from "react-redux";
import Auxiliary from "../../../../Auxiliary/Auxiliary";
import Input from "../../../UI/InputAdmin/Input";
import Select from "../../../UI/Select/Select";
import InputFileMultiple from "../../../UI/InputMultipleAdmin/InputFileMultiple";


function createFormControls() {
    return {
        projectTitle: createControl({
            label: "Create Title",
            errorMessage: 'Sahifa Nomi bo\'sh bo\'lishi mumkin emas'
        }, {required: true}),
    }
}

let refTextarea = "textarea"
let valueInput = ""

class ProjectListEdit extends Component {

    state = {
        textTitle: '',
        editor: "",
        editorText: "",
        staticImage: "",
        staticImageName: "Select file",
        url: [],
        urlWatch: [],
        editorError: null,
        image: null,
        staticImageSize: null,
        errorImage: null,
        category: [],
        progress: [],
        imageAdding: false,
        isFormValid: false,
        lookCheck: false,
        dataCreate: "",
        formControls: createFormControls()
    }

    componentDidMount() {
        document.querySelector("div[contenteditable]").addEventListener("paste", function (e) {
            e.preventDefault();
            let text = e.clipboardData.getData("text/plain");
            document.execCommand("insertHTML", false, text);
        });
    }

    handleChangeCatalog = e => {
        let fileUrl = e.target.files[0];
        let file = e.target.files;
        let iNum = []


        if (file.length === 0) {
            $('.__lk-fileInput span').removeClass('right');
            this.setState({
                staticImage: "",
                staticImageName: "Select file",
                staticImageSize: null,
                errorImage: "File no select",
                imageAdding: false,
            })
        } else {
            for (let i = 0; i < file.length; i++) {
                iNum.push(file[i])
            }
            $('.__lk-fileInput span').addClass('right');
            this.setState({
                urlWatch: iNum,
                staticImage: URL.createObjectURL(fileUrl),
                staticImageName: "First image " + fileUrl.name,
                staticImageSize: (fileUrl.size / 1048576).toFixed(3),
                image: file,
                errorImage: null,
            })
        }
    };

    handleUploadCatalog = () => {
        this.setState({
            image: null,
            staticImage: "",
            staticImageName: "Select file",
            staticImageSize: null,
        })

        let numFor = 1

        for (let i = 0; i < this.state.image.length; i++) {
            let nameFile = this.state.image[i].name
            numFor = 1 + i

            function encode(name) {
                return window.btoa(name);
            }

            let inputFileName = this.state.image[i].name,
                encoded = encode(inputFileName)

            let lowerCaseEncoded = encoded.toLowerCase();

            let nameList = lowerCaseEncoded.slice(5);

            let ext = nameFile.substr(nameFile.lastIndexOf('.') + 0);


            let filenames = nameList + ext

            const uploadTask = storage.ref(`images/${filenames}`).put(this.state.image[i]);

            uploadTask.on(
                "state_changed",
                snapshot => {

                    let progressBar = []
                    if (i === i) {
                        const progress = Math.round(
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        )

                        progressBar.push({
                                [i]: progress
                            }
                        )
                    }

                    this.setState({
                        progress: progressBar
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
                                imageAdding: true,
                                staticImage: "",
                            }))
                        });
                }
            );

        }


        console.log(numFor)


    };

    submitHandler = event => {
        event.preventDefault()
    };

    createProjectHandler = event => {
        event.preventDefault();

        if (this.state.url.length === 0) {
            this.setState({
                staticImage: "",
                staticImageName: "Select file",
                staticImageSize: null,
                image: null,
                imageAdding: false,
                errorImage: "File no update",
                url: [],
            })
            document.getElementById("images").value = "";
        } else {
            if (this.state.editor.length <= 6) {
                this.setState({
                    editorError: "Text 6 ta harf dan kam bo'lish mumkin emas",
                })
            } else {
                let currentdate = new Date();
                let datetime = currentdate.getDate() + "/"
                    + (currentdate.getMonth() + 1) + "/"
                    + currentdate.getFullYear() + " "
                    + currentdate.getHours() + ":"
                    + currentdate.getMinutes() + ":"
                    + currentdate.getSeconds();

                const {projectTitle} = this.state.formControls;

                const projectItem = {
                    projectTitle: projectTitle.value,
                    projectText: this.state.editor,
                    projectImgUrl: this.state.url,
                    createData: datetime,
                    id: this.props.catalogCreate.length + 1,
                };
                document.getElementById("textBox").innerHTML = ''
                this.props.createProjectCatalog(projectItem)

                this.setState({
                    project: [],
                    image: null,
                    url: [],
                    staticImage: "",
                    errorImage: null,
                    editorError: null,
                    dataCreate: "",
                    editor: "",
                    progress: 0,
                    isFormValid: false,
                    imageAdding: false,
                    lookCheck: false,
                    formControls: createFormControls()
                })

                this.props.finishCreateCatalogProject()
            }

        }


    };

    changeHandler = (value, controlName) => {
        const formControls = {...this.state.formControls};
        const control = {...formControls[controlName]};
        // eslint-disable-next-line
        if (this.state.textTitle.length == valueInput.length) {
            this.setState({
                lookCheck: true,
            })
        }

        control.touched = true;
        control.value = value;
        control.valid = validate(control.value, control.validation);

        formControls[controlName] = control;
        valueInput = value

        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })
    };

    editorChange(event) {
        event.preventDefault();
        // eslint-disable-next-line
        if (this.state.editor.length == this.state.editorText.length) {
            this.setState({
                lookCheck: true,
            })
        }
        this.setState({
            editor: refTextarea.innerHTML.trim()
        })
    }

    saveChanges = () => {
        if (this.state.url.length === 0) {
            this.setState({
                staticImage: "",
                staticImageName: "Select file",
                staticImageSize: null,
                image: null,
                imageAdding: false,
                errorImage: "File no update",
                url: [],
            })
            document.getElementById("images").value = "";
        } else {
            if (this.state.editor.length <= 6) {
                this.setState({
                    editorError: "Text 6 ta harf dan kam bo'lish mumkin emas",
                })
            } else {
                this.setState({
                    textTitle: valueInput,
                    editorText: refTextarea.innerHTML.trim()
                })
            }
        }

    }

    renderInput = () => {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];

            return (
                <Auxiliary key={controlName + index}>
                    {
                        <Input
                            label={control.label}
                            value={control.value}
                            valid={control.valid}
                            shouldValidate={!!control.validation}
                            touched={control.touched}
                            errorMessage={control.errorMessage}
                            onChange={event => this.changeHandler(event.target.value, controlName)}
                        />

                    }
                </Auxiliary>
            )
        })
    }

    selectChangeHandler = event => {
        this.setState({
            category: +event.target.value
        })
    };

    render() {
        const select = <Select
            label="Category"
            value={this.state.category}
            onChange={this.selectChangeHandler}
            options={[
                {text: "Achitecture", value: 1},
                {text: "Interior Design", value: 2},
                {text: "Urban Design", value: 3},
                {text: "Planning", value: 4},
                {text: "3D Modelling", value: 5},
                {text: "Decor Plan", value: 6}
            ]}
        />;

        return (
            <section className="mt-5 edit container">
                <form className="row" onSubmit={this.submitHandler}>
                    <div className="col-12">
                        <br/>
                        <React.Fragment>
                            <InputFileMultiple
                                legend="Project Catalog image"
                                file={this.state.staticImage}
                                label={this.state.staticImageName}
                                size={this.state.staticImageSize}
                                errorMessage={this.state.errorImage}
                                onChange={this.handleChangeCatalog}
                            />

                            <br/>
                            {
                                this.state.progress === 0
                                    ? <React.Fragment> {
                                        this.state.progress.map((progress, index) => {
                                            return (
                                                <div className="progress">
                                                    <div className="progress-bar"
                                                         aria-valuenow="0"
                                                         aria-valuemin="0"
                                                         aria-valuemax="100"
                                                         style={{width: progress[index] + "%"}}
                                                    >{progress[index]}</div>

                                                </div>
                                            )
                                        })
                                    }
                                    </React.Fragment>
                                    : <React.Fragment> {
                                        this.state.progress.map((progress, index) => {
                                            return (
                                            <div className="progress">
                                                <div className="progress-bar"
                                                     aria-valuenow="0"
                                                     aria-valuemin="0"
                                                     aria-valuemax="100"
                                                     style={{width: progress[index] + "%"}}
                                                >{progress[index]}</div>

                                            </div>
                                            )
                                        })
                                    }
                                    </React.Fragment>
                            }

                            <br/>
                            <Button
                                type="primary"
                                onClick={this.handleUploadCatalog}
                                disabled={!this.state.image}
                            >
                                Image upload
                            </Button>
                        </React.Fragment>
                        {
                            this.state.urlWatch.map((url, index) => {
                                return (
                                    <img src={URL.createObjectURL(url)} alt="images" key={index}/>
                                )
                            })
                        }

                        <br/>
                        <br/>
                        {
                            <React.Fragment>
                                {select}
                                {this.renderInput()}
                                <TextArea
                                    label="Create Text"
                                    inputRef={el => refTextarea = el}
                                    onInput={(event) => this.editorChange(event)}
                                    errorMessage={this.state.editorError}
                                />

                                <Button
                                    type="success"
                                    className="btn"
                                    onClick={this.saveChanges}
                                    disabled={!this.state.isFormValid || !this.state.imageAdding}
                                >
                                    Save and Look change slider
                                </Button>
                                <Button
                                    type="success"
                                    className="btn"
                                    onClick={this.createProjectHandler}
                                >
                                    Slider Create
                                </Button>
                                <br/>
                            </React.Fragment>
                        }
                        <br/>
                    </div>
                </form>
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        catalogCreate: state.create.projectCatalog,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createProjectCatalog: item => dispatch(createProjectCatalog(item)),
        finishCreateCatalogProject: () => dispatch(finishCreateCatalogProject()),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListEdit);
