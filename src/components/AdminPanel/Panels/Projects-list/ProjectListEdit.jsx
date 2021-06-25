import React, {Component} from "react";
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
import {GalleryItem, LightBoxGallery} from "@sekmet/react-magnific-popup";


function createFormControls() {
    return {
        projectTitle: createControl({
            label: "Year",
            errorMessage: 'Yil bo\'sh bo\'lishi mumkin emas'
        }, {required: true}),
        projectText: createControl({
            label: "Create Title",
            errorMessage: 'Sahifa Nomi bo\'sh bo\'lishi mumkin emas'
        }, {required: true}),
        projectCompany: createControl({
            label: "Create Company Name",
            errorMessage: 'Kompaniyani Nomi bo\'sh bo\'lishi mumkin emas'
        }, {required: true}),
        projectLocation: createControl({
            label: "Create Location",
            errorMessage: 'Manzil bo\'sh bo\'lishi mumkin emas'
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
        category: 1,
        categoryText: "",
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
                staticImageName: "First image - " + fileUrl.name,
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
                let currentDate = new Date();
                let datetime = currentDate.getDate() + "/"
                    + (currentDate.getMonth() + 1) + "/"
                    + currentDate.getFullYear() + " "
                    + currentDate.getHours() + ":"
                    + currentDate.getMinutes() + ":"
                    + currentDate.getSeconds();

                const {projectTitle} = this.state.formControls;

                const projectItem = {
                    category: this.state.category,
                    data: [{
                        projectTitle: projectTitle.value,
                        projectText: this.state.editor,
                        projectImgUrl: this.state.url,
                        createData: datetime,
                        id: this.props.catalogCreate.length + 1,
                    }
                    ]


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
                        index === 0
                            ? <Input
                                label={control.label}
                                value={control.value}
                                type="number"
                                valid={control.valid}
                                shouldValidate={!!control.validation}
                                touched={control.touched}
                                errorMessage={control.errorMessage}
                                onChange={event => this.changeHandler(event.target.value, controlName)}
                            />
                            : <Input
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

    renderGallery = () => {
        return this.state.urlWatch.map((url, index) => {
            return (
                <div className="col-md-6" key={index}>
                    <GalleryItem
                        className="gallery-item"
                        href={URL.createObjectURL(url)}
                        title={this.state.categoryText}
                    >
                        <div className="gallery-box">
                            <div className="gallery-img">
                                <img src={URL.createObjectURL(url)} className="img-fluid mx-auto d-block"
                                     alt="work-img"/>
                            </div>
                        </div>
                    </GalleryItem>
                </div>


            )
        })
    }

    selectChangeHandler = event => {
        let index = event.nativeEvent.target.selectedIndex;
        this.setState({
            category: +event.target.value,
            categoryText: event.nativeEvent.target[index].text
        })
    };

    render() {
        const select = <Select
            label="Category"
            placeholder="Please select category"
            value={this.state.category}
            onChange={this.selectChangeHandler}
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
        const config = {
            delegate: 'a',
            type: 'image',
            tLoading: 'Loading image #%curr%...',
            mainClass: 'mfp-fade mfp-img-mobile',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
            },
            image: {
                tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                titleSrc: function (item) {
                    return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
                }
            }
        }

        return (
            <section className="mt-5 edit container">
                <form className="row" onSubmit={this.submitHandler}>
                    <div className="col-12">
                        <br/>
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
                                ? null
                                : <React.Fragment> {
                                    this.state.progress.map((progress, index) => {
                                        return (
                                            <div className="progress" key={index}>
                                                <div className="progress-bar"
                                                     aria-valuenow="0"
                                                     aria-valuemin="0"
                                                     aria-valuemax="100"
                                                     style={{width: progress[index] + "%"}}
                                                >{progress[index]} %
                                                </div>

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
                        {
                            this.state.urlWatch.length === 0
                                ? null
                                : <LightBoxGallery className="popup-gallery"
                                                   config={config}>{this.renderGallery()}</LightBoxGallery>
                        }
                        <br/>
                        <br/>
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
                            hidden={this.state.lookChange}
                        >
                            Save and Look change slider
                        </Button>
                        <Button
                            type="success"
                            className="btn"
                            disabled={!this.state.lookChange}
                            hidden={!this.state.lookChange}
                            onClick={this.createProjectHandler}
                        >
                            Slider Create
                        </Button>
                        <br/>
                        <br/>
                    </div>
                </form>
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        catalogCreate: state.create.category,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createProjectCatalog: item => dispatch(createProjectCatalog(item)),
        finishCreateCatalogProject: () => dispatch(finishCreateCatalogProject()),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListEdit);
