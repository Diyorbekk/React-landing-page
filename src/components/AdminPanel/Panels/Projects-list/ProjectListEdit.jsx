import React, {Component} from "react";
import Button from "../../../UI/Button/Button";
import TextArea from "../../../UI/TextAreaAdmin/TextArea";
import {createControl, validate, validateForm} from "../../../UI/form/formFramework";
import {storage} from "../../../../util/firebase";
import {createProjectCatalog, finishCreateCatalogProject} from "../../../../store/actions/create";
import {connect} from "react-redux";
import Auxiliary from "../../../../Auxiliary/Auxiliary";
import Input from "../../../UI/InputAdmin/Input";
import Select from "../../../UI/Select/Select";
import InputFileMultiple from "../../../UI/InputMultipleAdmin/InputFileMultiple";
import {GalleryItem, LightBoxGallery} from "@sekmet/react-magnific-popup";
import CompletedCheck from "../../../UI/completedCheck/completedCheck";
import Banner from "../../../../assets/img/banner.jpg";
import ContentWrapper from "../../../content-wrapper";
import $ from 'jquery';
window.jQuery = $;
window.$ = $;


function createFormControls() {
    return {
        projectYear: createControl({
            label: "Year",
            errorMessage: 'Yil bo\'sh bo\'lishi mumkin emas'
        }, {required: true}),
        projectTitle: createControl({
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
        textYear: '',
        textCompany: '',
        textLocation: '',
        editor: "",
        editorText: "",
        staticImage: "",
        staticImageName: "Select files",
        url: [],
        urlWatch: [],
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

    handleChangeCatalog = e => {
        let fileUrl = e.target.files[0];
        let file = e.target.files;
        let iNum = []


        if (file.length === 0) {
            window.$(document).ready(function () {
                window.$('.__lk-fileInput span').removeClass('right');
                window.$('.__lk-fileInput .multiple-file').addClass('error');
            })
            this.setState({
                staticImage: "",
                image: null,
                staticImageName: "Select file",
                staticImageSize: null,
                errorImage: "File no select",
                imageAdding: false,
                urlWatch: [],
            })
        } else {
            for (let i = 0; i < file.length; i++) {
                let fileName = file[i].name
                let fileNameSlice = fileName.slice(0, fileName.indexOf('.'))
                if(fileNameSlice.length < 4){
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
                        urlWatch: [],
                    })
                } else {
                    iNum.push(file[i])
                    window.$(document).ready(function () {
                        window.$('.__lk-fileInput span').addClass('right');
                        window.$('.__lk-fileInput .multiple-file').removeClass('error');
                    })
                    window.$('.__lk-fileInput span').addClass('right');
                    this.setState({
                        urlWatch: iNum,
                        staticImage: URL.createObjectURL(fileUrl),
                        staticImageName: "First image - " + fileUrl.name,
                        staticImageSize: (fileUrl.size / 1048576).toFixed(3),
                        image: file,
                        errorImage: null,
                    })
                }

            }

        }
    };

    handleUploadCatalog = () => {
        this.setState({
            image: null,
            staticImage: "",
            staticImageName: "Select file",
            staticImageSize: null,
        })

        let numFor = this.state.image.length
        let iFor = 0

        for (let i = 0; i < this.state.image.length; i++) {
            iFor = 1 + i
            let nameFile = this.state.image[i].name

            // eslint-disable-next-line

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
            if (iFor === numFor) {
                uploadTask.on(
                    "state_changed",
                    snapshot => {
                        // eslint-disable-next-line

                        const progress = Math.round(
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        )
                        this.setState({
                            progress: progress
                        })


                    },
                );
            }

            uploadTask.on(
                "state_changed",
                () => {
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
            )

        }
    };

    submitHandler = event => {
        event.preventDefault()
    };

    changeHandler = (value, controlName) => {
        const formControls = {...this.state.formControls};
        const control = {...formControls[controlName]};
        let valueLengthTitle = this.state.textTitle.length, valueLengthYear = this.state.textYear.length,
            valueLengthCompany = this.state.textCompany.length, valueLengthLocation = this.state.textLocation.length
        // eslint-disable-next-line
        if (valueLengthTitle == valueInput.length || valueLengthYear == valueInput.length || valueLengthCompany == valueInput.length || valueLengthLocation == valueInput.length) {
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

    editorChange(event) {
        event.preventDefault();
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

    createProjectHandler = event => {
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

                if (this.state.category === 1) {
                    this.setState({
                        categoryError: "Kategoriyani talash kerak",
                    })
                }
                let currentDate = new Date();
                let datetime = currentDate.getDate() + "/"
                    + (currentDate.getMonth() + 1) + "/"
                    + currentDate.getFullYear() + " "
                    + currentDate.getHours() + ":"
                    + currentDate.getMinutes() + ":"
                    + currentDate.getSeconds();

                const {projectTitle, projectYear, projectCompany, projectLocation} = this.state.formControls;

                const projectItem = {
                    category: this.state.category,
                    categoryName: this.state.categoryText,
                    categoryData: [{
                        projectTitle: projectTitle.value,
                        projectYear: projectYear.value,
                        projectCompany: projectCompany.value,
                        projectLocation: projectLocation.value,
                        projectText: this.state.editor,
                        projectImgUrl: this.state.url,
                        createData: datetime,
                        id: this.props.catalogCreate.length + 1,
                    }]


                };
                this.props.createProjectCatalog(projectItem)

                this.props.finishCreateCatalogProject()

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
                    lookChange: false,
                    category: 1,
                    textTitle: '',
                    textYear: '',
                    textCompany: '',
                    textLocation: '',
                    editorText: "",
                    staticImageName: "Select files",
                    urlWatch: [],
                    staticImageSize: null,
                    categoryError: null,
                    categoryText: "",
                    formControls: createFormControls()
                })
                document.getElementById("textBox").innerHTML = ''
            }

        }


    };

    saveChanges = event => {
        event.preventDefault();
        if (this.state.url.length === 0) {
            this.setState({
                staticImage: "",
                staticImageName: "Select file",
                staticImageSize: null,
                image: null,
                imageAdding: false,
                errorImage: "File no update",
                lookChange: false,
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
                    const {projectTitle, projectYear, projectCompany, projectLocation} = this.state.formControls;
                    this.setState({
                        lookChange: true,
                        editorError: null,
                        categoryError: null,
                        textTitle: projectTitle.value,
                        textYear: projectYear.value,
                        textCompany: projectCompany.value,
                        textLocation: projectLocation.value,
                        editorText: refTextarea.innerHTML.trim()
                    })
                }

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

    renderGallery() {
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

    renderLookGallery(e) {
        const config = {
            delegate: 'a',
            type: 'image',
            tLoading: 'Loading image #%curr%...',
            mainClass: 'mfp-fade mfp-img-mobile',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0, 1]
            },
            image: {
                tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                titleSrc: function (item) {
                    return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
                }
            }
        }
        window.$(document).ready(function () {

            window.$(this).attr("data-background")
            var pageSection = window.$(".bg-img, section");
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

            return (
                <ContentWrapper>
                    <div className="banner-header banner-img valign bg-img bg-fixed"
                         data-overlay-light="3"
                         data-background={Banner}/>
                    <div className="section-padding2">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <h2 className="section-title2">{this.state.textTitle}</h2>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-8">
                                    <p dangerouslySetInnerHTML={{__html: this.state.editorText}}/>
                                </div>
                                <div className="col-md-4">
                                    <p><b>Year : </b> {this.state.textYear}</p>
                                    <p><b>Company : </b> {this.state.textCompany}</p>
                                    <p><b>Project Name : </b> {this.state.textTitle}</p>
                                    <p><b>Location : </b> {this.state.textLocation}</p>
                                </div>
                            </div>
                            <div className="row mt-30">
                                <LightBoxGallery
                                    className="popup-gallery"
                                    config={config}
                                >
                                    {
                                        this.state.url.map((url, index) => {
                                            return (
                                                <div className="col-md-6" key={index}>
                                                    <GalleryItem
                                                        className="gallery-item"
                                                        href={url}
                                                        title={this.state.categoryText}
                                                    >
                                                        <div className="gallery-box">
                                                            <div className="gallery-img">
                                                                <img src={url}
                                                                     className="img-fluid mx-auto d-block"
                                                                     alt="work-img"/>
                                                            </div>
                                                        </div>
                                                    </GalleryItem>
                                                </div>
                                            )
                                        })
                                    }
                                </LightBoxGallery>
                            </div>
                        </div>
                    </div>
                </ContentWrapper>
            )
        }
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
        const config = {
            delegate: 'a',
            type: 'image',
            tLoading: 'Loading image #%curr%...',
            mainClass: 'mfp-fade mfp-img-mobile',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0, 1]
            },
            image: {
                tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
                titleSrc: function (item) {
                    return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
                }
            }
        }

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
                    this.props.catalogCreate.length === 0
                        ? null
                        : <CompletedCheck/>
                }
                <form className="row" onSubmit={this.submitHandler}>
                    <div className="col-12">

                        <br/>
                        {
                            this.state.url.length === 0
                                ? <React.Fragment>
                                    <InputFileMultiple
                                        legend="Project Catalog image"
                                        file={this.state.staticImage}
                                        label={this.state.staticImageName}
                                        size={this.state.staticImageSize}
                                        errorMessage={this.state.errorImage}
                                        onChange={this.handleChangeCatalog}
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
                                        onClick={this.handleUploadCatalog}
                                        disabled={!this.state.image}
                                    >
                                        Image upload
                                    </Button>
                                    <LightBoxGallery className="popup-gallery"
                                                     config={config}>{this.renderGallery()}</LightBoxGallery>
                                </React.Fragment>

                                : <div className="row w-100">{this.renderLookGallery(this.state.lookChange)}</div>
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
