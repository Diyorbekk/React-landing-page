import React, {Component} from "react";
import {createControl, validate, validateForm} from "../../../UI/form/formFramework";
import {storage} from "../../../../util/firebase";
import Auxiliary from "../../../../Auxiliary/Auxiliary";
import Input from "../../../UI/InputAdmin/Input";
import TextArea from "../../../UI/TextAreaAdmin/TextArea";
import InputFile from "../../../UI/InputFileAdmin/InputFile";
import Button from "../../../UI/Button/Button";
import {createProject, finishCreateProject} from "../../../../store/actions/create";
import {connect} from "react-redux";
import CompletedCheck from "../../../UI/completedCheck/completedCheck";
import $ from 'jquery';
import {Swiper, SwiperSlide} from "swiper/react";
import SwiperCore, {
    EffectFade,
    Lazy,
    Autoplay,
    Navigation
} from 'swiper/core';

import "swiper/swiper.min.css";
import "swiper/components/effect-fade/effect-fade.min.css"
import "swiper/components/lazy/lazy.min.css"
import "swiper/components/navigation/navigation.min.css"

window.jQuery = $;
window.$ = $;


function createFormControls() {
    return {
        projectTitle: createControl({
            label: "Create Title",
            errorMessage: 'Sahifa Nomi bo\'sh bo\'lishi mumkin emas'
        }, {required: true}),
    }
}

const navigation = {
    nextEl: ".owl-next",
    prevEl: ".owl-prev "
};

let refTextarea = "textarea"
let valueInput = ""


class SliderEdit extends Component {

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

    handleChange = e => {
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
                let currentDateSlider = new Date();
                let datetimeSlider = currentDateSlider.getDate() + "/"
                    + (currentDateSlider.getMonth() + 1) + "/"
                    + currentDateSlider.getFullYear() + " "
                    + currentDateSlider.getHours() + ":"
                    + currentDateSlider.getMinutes() + ":"
                    + currentDateSlider.getSeconds();

                const {projectTitle} = this.state.formControls;

                const projectItem = {
                    projectTitle: projectTitle.value,
                    projectText: this.state.editor,
                    projectImgUrl: this.state.url,
                    createData: datetimeSlider,
                    id: this.props.projectCreate.length + 1,
                };

                this.props.createProject(projectItem)

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
                    textTitle: '',
                    editorText: "",
                    staticImageName: "Select file",
                    staticImageSize: null,
                    formControls: createFormControls()
                })

                this.props.finishCreateProject()
                document.getElementById("textBox").innerHTML = ''
            }

        }


    };

    changeHandler = (value, controlName) => {
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

    editorChange(event) {
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

    saveChanges = () => {
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
                this.setState({
                    textTitle: valueInput,
                    lookChange: true,
                    editorText: refTextarea.innerHTML.trim()
                })
            }
        }

    }

    sliderStart() {
        window.$(document).ready(function () {
            let item = window.$('.swiper-slide-prev, .swiper-slide-next');
            let owlItem = window.$('.swiper-slide')
            let owlItemActive = window.$('.swiper-slide-active, .swiper-slide-duplicate-active')
            let owlItemClone = window.$('.swiper-slide.swiper-slide-duplicate')
            if (owlItem.hasClass("swiper-slide-active") || owlItemClone.hasClass("swiper-slide-active")) {
                window.$(owlItemActive).not('.swiper-slide-duplicate').find('h1').removeClass('animated fadeOutDown');
                window.$(owlItemActive).not('.swiper-slide-duplicate').find('p').removeClass('animated fadeOutDown');
                window.$(owlItemActive).not('.swiper-slide-duplicate').find('.butn-light').removeClass('animated fadeOutDown')
                window.$(owlItemActive).not('.swiper-slide-duplicate').find('h4').removeClass('animated fadeOutDown');
                window.$(owlItemActive).not('.swiper-slide-duplicate').find('h1').addClass('animated fadeInUp');
                window.$(owlItemActive).not('.swiper-slide-duplicate').find('p').addClass('animated fadeInUp');
                window.$(owlItemActive).not('.swiper-slide-duplicate').find('.butn-light').addClass('animated fadeInUp')
                window.$(owlItemActive).not('.swiper-slide-duplicate').find('h4').addClass('animated fadeInUp');
            } else {
                window.$('h4').removeClass('animated fadeInUp');
                window.$('h1').removeClass('animated fadeInUp');
                window.$('p').removeClass('animated fadeInUp');
                window.$('.butn-light').removeClass('animated fadeInUp');
            }
            window.$(item).not('.swiper-slide-duplicate').find('h1').addClass('animated fadeOutDown');
            window.$(item).not('.swiper-slide-duplicate').find('p').addClass('animated fadeOutDown');
            window.$(item).not('.swiper-slide-duplicate').find('.butn-light').addClass('animated fadeOutDown')
            window.$(item).not('.swiper-slide-duplicate').find('h4').addClass('animated fadeOutDown');

        })
    }

    renderProjects(e) {
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
                SwiperCore.use([EffectFade, Navigation, Lazy, Autoplay]);
                return (
                    <div className="col-12 slider-fade" key={index}>
                        <Swiper
                            navigation={navigation}
                            effect={'fade'}
                            lazy={true}
                            loop={true}
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false
                            }}
                            grabCursor={true}
                            onSlideChange={() => this.sliderStart()}
                            className="header-slider">
                            <SwiperSlide key={index}>
                                <div className="text-left item bg-img swiper-lazy" data-overlay-dark="3"
                                     style={{backgroundImage: `url(${projects})`}}>
                                    <div className="v-bottom caption">
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-md-7">
                                                    <div className="o-hidden">
                                                        <h1>{this.state.textTitle}</h1>
                                                        <hr/>
                                                        <p className="text-white"
                                                           dangerouslySetInnerHTML={{__html: this.state.editorText}}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="swiper-lazy-preloader swiper-lazy-preloader-white"/>
                            </SwiperSlide>
                        </Swiper>
                        <div className="owl-nav">
                            <div className="owl-prev"><i className="ti-angle-left" aria-hidden="true"/></div>
                            <div className="owl-next"><i className="ti-angle-right" aria-hidden="true"/></div>
                        </div>
                    </div>
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
                            onChange={event => this.changeHandler(event.target.value, controlName)}
                        />

                    }
                </Auxiliary>
            )
        })
    }

    render() {
        return (
            <section className="mt-5 edit container">
                {
                    this.props.projectCreate.length === 0
                        ? null
                        : <CompletedCheck/>
                }
                <form className="row" onSubmit={this.submitHandler}>
                    <div className="col-12">
                        <br/>
                        {
                            this.state.url.length === 0 ?
                                <React.Fragment>
                                    <InputFile
                                        legend="Slide image"
                                        file={this.state.staticImage}
                                        label={this.state.staticImageName}
                                        size={this.state.staticImageSize}
                                        errorMessage={this.state.errorImage}
                                        onChange={this.handleChange}
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
                                        onClick={this.handleUpload}
                                        disabled={!this.state.image}
                                    >
                                        Image upload
                                    </Button>
                                </React.Fragment>
                                : <div className="row">{this.renderProjects(this.state.lookChange)} </div>
                        }

                        <br/>
                        <br/>
                        {
                            <React.Fragment>
                                {this.renderInput()}
                                <TextArea
                                    label="Create Text"
                                    inputRef={el => refTextarea = el}
                                    onInput={(event) => this.editorChange(event)}
                                    onChange={(event) => this.editorChange(event)}
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
                                    onClick={this.createProjectHandler}
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
        projectCreate: state.create.project,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createProject: item => dispatch(createProject(item)),
        finishCreateProject: () => dispatch(finishCreateProject()),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SliderEdit);
