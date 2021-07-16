import React, {Component} from "react";
import {createNews, finishCreateNews} from "../../../../store/actions/create";
import CompletedCheck from "../../../UI/completedCheck/completedCheck";
import {createControl, validate, validateForm} from "../../../UI/form/formFramework";
import {storage} from "../../../../util/firebase";
import {connect} from "react-redux";
import Auxiliary from "../../../../Auxiliary/Auxiliary";
import Input from "../../../UI/InputAdmin/Input";
import Select from "../../../UI/Select/Select";
import InputFile from "../../../UI/InputFileAdmin/InputFile";
import Button from "../../../UI/Button/Button";
import TextArea from "../../../UI/TextAreaAdmin/TextArea";
import ContentWrapper from "../../../content-wrapper";
import Banner from "../../../../assets/img/banner.jpg";

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

class NewsEdit extends Component {
    state = {
        textTitle: '',
        editor: "",
        editorText: "",
        staticImage: "",
        staticImageName: "Select file",
        url: [],
        editorError: null,
        image: null,
        staticImageSize: null,
        errorImage: null,
        category: 1,
        categoryError: null,
        categoryText: "",
        progress: 0,
        imageAdding: false,
        isFormValid: false,
        lookChange: false,
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

    handleNewsImageChange = e => {
        let fileUrl = e.target.files[0];
        let file = e.target.files;
        if (file.length === 0) {
            window.$('.__lk-fileInput span').removeClass('right');
            this.setState({
                staticImage: "",
                staticImageName: "Select file",
                staticImageSize: null,
                errorImage: "File no select",
                imageAdding: false,
            })
        } else {
            for (let i = 0; i < file.length; i++) {
                let fileName = file[i].name
                let fileNameSlice = fileName.slice(0, fileName.indexOf('.'))
                if (fileNameSlice.length < 4) {
                    window.$(document).ready(function () {
                        window.$('.__lk-fileInput span').removeClass('right');
                        window.$('.__lk-fileInput .multiple-file').addClass('error');
                    })

                    this.setState({
                        staticImage: "",
                        image: null,
                        staticImageName: "Select file",
                        staticImageSize: null,
                        errorImage: file[i].name + " - Fayl nomi 4 ta harf dan kam yoki nomi son bo'lish mumkun emas",
                        imageAdding: false,
                    })
                } else {
                    window.$(document).ready(function () {
                        window.$('.__lk-fileInput span').addClass('right');
                        window.$('.__lk-fileInput .multiple-file').removeClass('error');
                    })
                    window.$('.__lk-fileInput span').addClass('right');
                    this.setState({
                        staticImage: URL.createObjectURL(fileUrl),
                        staticImageName: fileUrl.name,
                        staticImageSize: (fileUrl.size / 1048576).toFixed(3),
                        image: e.target.files[0],
                        errorImage: null,
                    })
                }

            }


        }
    };

    handleNewsImageUpload = () => {
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

        const uploadTask = storage.ref(`images/news/${filenames}`).put(this.state.image);
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
                    .ref("images/news")
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

    };

    submitHandler = event => {
        event.preventDefault()
    };

    createNewsHandler = event => {
        event.preventDefault();

        if (this.state.url.length === 0) {
            this.setState({
                staticImage: "",
                staticImageName: "Select file",
                staticImageSize: null,
                image: null,
                imageAdding: false,
                lookChange: false,
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
                let currentDateSlider = new Date();
                let datetimeSlider = currentDateSlider.getDate() + "."
                    + (currentDateSlider.getMonth() + 1) + "."
                    + currentDateSlider.getFullYear()

                const {projectTitle} = this.state.formControls;

                const projectItem = {
                    category: this.state.category,
                    categoryName: this.state.categoryText,
                    projectTitle: projectTitle.value,
                    projectText: this.state.editor,
                    projectImgUrl: this.state.url,
                    createData: datetimeSlider,
                    id: this.props.newsCreate.length + 1,
                };

                this.props.createNews(projectItem)

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
                    lookChange: false,
                    lookCheck: false,
                    category: 1,
                    categoryError: null,
                    categoryText: "",
                    textTitle: '',
                    editorText: "",
                    staticImageName: "Select file",
                    staticImageSize: null,
                    formControls: createFormControls()
                })

                this.props.finishCreateNews()
                document.getElementById("textBox").innerHTML = ''
            }

        }


    };

    inputHandler = (value, controlName) => {
        const formControls = {...this.state.formControls};
        const control = {...formControls[controlName]};
        // eslint-disable-next-line
        if (this.state.textTitle.length == valueInput.length) {
            this.setState({
                lookChange: false,
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

    editorInputChange(event) {
        event.preventDefault();
        document.getElementById("textBox").addEventListener("input", function (e) {
            console.log(refTextarea.innerHTML.trim());
        }, false);
        // eslint-disable-next-line
        if (this.state.editor.length == this.state.editorText.length) {
            this.setState({
                lookChange: false,
                lookCheck: true,
            })
        }
        this.setState({
            editor: refTextarea.innerHTML.trim()
        })
    }

    saveNewsChanges = () => {
        if (this.state.url.length === 0) {
            this.setState({
                staticImage: "",
                staticImageName: "Select file",
                staticImageSize: null,
                image: null,
                imageAdding: false,
                lookChange: false,
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

                if (this.state.category === 1) {
                    this.setState({
                        categoryError: "Kategoriyani talash kerak",
                    })
                    let element = document.querySelector("#error-select");
                    element.scrollIntoView({behavior: 'smooth', block: 'end'});
                } else {
                    this.setState({
                        textTitle: valueInput,
                        lookChange: true,
                        editorText: refTextarea.innerHTML.trim()
                    })
                }

            }
        }

    }

    renderNews(e) {
        window.$(document).ready(function () {
            window.$(this).attr("data-background")
            let pageSection = window.$(".bg-img, section");
            pageSection.each(function () {
                if (window.$(this).attr("data-background")) {
                    window.$(this).css("background-image", "url(" + window.$(this).data("background") + ")");
                }
            })
        })

        if (e === false) {
            if (this.state.lookCheck) {
                return (
                    <div className="col-12">
                        Please check save 🔁
                    </div>
                )
            } else {
                return (
                    <div className="col-12">
                        Uploading Image ✅
                    </div>
                )
            }
        } else {

            return this.state.url.map((projects, index) => {
                return (
                    <ContentWrapper>
                        <div className="banner-header banner-img valign bg-img bg-fixed"
                             data-overlay-light="3"
                             data-background={Banner} key={index}/>
                        <div className="pb-90">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12">
                                        <img src={projects} className="mb-30" alt={projects}/>
                                        <h2 className="section-title2">{this.state.textTitle}</h2>
                                        <p dangerouslySetInnerHTML={{__html: this.state.editorText}}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ContentWrapper>
                )
            })

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
                            onChange={event => this.inputHandler(event.target.value, controlName)}
                        />

                    }
                </Auxiliary>
            )
        })
    }

    selectChangeHandler = event => {
        let index = event.nativeEvent.target.selectedIndex;
        let category = event.target.value

        this.setState({
            category: category,
            categoryText: event.nativeEvent.target[index].text
        })
        // eslint-disable-next-line
        if (category == event.target.value) {
            this.setState({
                lookCheck: true,
            })
        }

    };

    render() {
        const select = <Select
            label="Category"
            placeholder="Please select category"
            value={this.state.category}
            onChange={this.selectChangeHandler}
            errorMessage={this.state.categoryError}
            options={[
                {text: "Please select category", value: 1},
                {text: "Architecture", value: 2},
                {text: "Interior Design", value: 3},
                {text: "Urban Design", value: 4},
                {text: "Planning", value: 5},
                {text: "3D Modelling", value: 6},
                {text: "Decor Plan", value: 7}
            ]}
        />;

        return (
            <section className="mt-5 edit container">
                {
                    this.props.newsCreate.length === 0
                        ? null
                        : <CompletedCheck/>
                }
                <form className="row" onSubmit={this.submitHandler}>
                    <div className="col-12">
                        <br/>
                        {
                            this.state.url.length === 0
                                ? <React.Fragment>
                                    <InputFile
                                        legend="News image"
                                        file={this.state.staticImage}
                                        label={this.state.staticImageName}
                                        size={this.state.staticImageSize}
                                        errorMessage={this.state.errorImage}
                                        onChange={this.handleNewsImageChange}
                                    />
                                    <br/>
                                    <div className="progress">
                                        <div className="progress-bar"
                                             aria-valuenow="0"
                                             aria-valuemin="0"
                                             aria-valuemax="100"
                                             style={{width: this.state.progress + "%"}}
                                        >{this.state.progress} %
                                        </div>

                                    </div>
                                    <br/>
                                    <Button
                                        type="primary"
                                        onClick={this.handleNewsImageUpload}
                                        disabled={!this.state.image}
                                    >
                                        Image upload
                                    </Button>
                                </React.Fragment>
                                : <div className="row">{this.renderNews(this.state.lookChange)}</div>
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
                                    onInput={(event) => this.editorInputChange(event)}
                                    onChange={(event) => this.editorInputChange(event)}
                                    errorMessage={this.state.editorError}
                                />

                                <Button
                                    type="success"
                                    className="btn"
                                    onClick={this.saveNewsChanges}
                                    disabled={!this.state.isFormValid || !this.state.imageAdding}
                                    hidden={this.state.lookChange}
                                >
                                    Save and Look change slider
                                </Button>
                                <Button
                                    type="success"
                                    className="btn"
                                    onClick={this.createNewsHandler}
                                    disabled={!this.state.lookChange}
                                    hidden={!this.state.lookChange}
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
        newsCreate: state.create.news,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createNews: item => dispatch(createNews(item)),
        finishCreateNews: () => dispatch(finishCreateNews()),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsEdit);
