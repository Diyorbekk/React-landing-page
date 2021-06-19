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
import OwlCarousel from "react-owl-carousel2";
import $ from "jquery";


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
            $('.__lk-fileInput span').removeClass('right');
            this.setState({
                staticImage: "",
                staticImageName: "Select file",
                staticImageSize: null,
                errorImage: "File no select",
                imageAdding: false,
            })
        } else {
            $('.__lk-fileInput span').addClass('right');
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
                    id: this.props.projectCreate.length + 1,
                };
                document.getElementById("textBox").innerHTML = ''
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
                    formControls: createFormControls()
                })

                this.props.finishCreateProject()
            }

        }


    };

    changeHandler = (value, controlName) => {
        const formControls = {...this.state.formControls};
        const control = {...formControls[controlName]};

        if (this.state.textTitle.length == valueInput.length){
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

    renderProjects(e) {
        if (e === false) {
            if(this.state.lookCheck) {
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


            const options = {
                items: 1,
                loop: true,
                dots: false,
                margin: 0,
                autoplay: true,
                smartSpeed: 500,
                nav: true,
                animateOut: 'fadeOut',
                navText: ['<i class="ti-angle-left" aria-hidden="true"></i>', '<i class="ti-angle-right" aria-hidden="true"></i>']
            };
            const events = {
                onChanged: function (event) {
                    var item = event.item.index - 2;     // Position of the current item
                    $('h4').removeClass('animated fadeInUp');
                    $('h1').removeClass('animated fadeInUp');
                    $('p').removeClass('animated fadeInUp');
                    $('.butn-light').removeClass('animated fadeInUp');
                    $('.owl-item').not('.cloned').eq(item).find('h4').addClass('animated fadeInUp');
                    $('.owl-item').not('.cloned').eq(item).find('h1').addClass('animated fadeInUp');
                    $('.owl-item').not('.cloned').eq(item).find('p').addClass('animated fadeInUp');
                    $('.owl-item').not('.cloned').eq(item).find('.butn-light').addClass('animated fadeInUp');
                }
            };
            return this.state.url.map((projects, index) => {
                return (
                    <div className="col-12 slider-fade" key={index}>
                        <OwlCarousel clasname="owl-carousel owl-theme" options={options} events={events}>
                            <div className="text-left item bg-img" data-overlay-dark="3" key={index}
                                 style={{backgroundImage: `url(${projects})`}}>
                                <div className="v-bottom caption">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-md-7">
                                                <div className="o-hidden">
                                                    <h1>{this.state.textTitle}</h1>
                                                    <hr/>
                                                    <p className="text-white">{this.state.editorText}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </OwlCarousel>
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
                {/*                <div>
                    <div id="toolBar1" className="row">
                        <div className="col-md-2">
                            <select className="form-control" onChange={(e) => formatDoc('formatblock', e.target.value)}>
                                <option selected>- формат -</option>
                                <option value="h1">Title 1 &lt;h1&gt;</option>
                                <option value="h2">Title 2 &lt;h2&gt;</option>
                                <option value="h3">Title 3 &lt;h3&gt;</option>
                                <option value="h4">Title 4 &lt;h4&gt;</option>
                                <option value="h5">Title 5 &lt;h5&gt;</option>
                                <option value="h6">Подзаголовок &lt;h6&gt;</option>
                                <option value="p">Параграф &lt;p&gt;</option>
                                <option value="pre">Preformatted &lt;pre&gt;</option>
                            </select>
                        </div>
                        <div className="col-md-2">
                            <select className="form-control" onChange={(e) => formatDoc('fontname', e.target.value)}>
                                <option className="heading" selected>- шрифт -</option>
                                <option>Arial</option>
                                <option>Arial Black</option>
                                <option>Courier New</option>
                                <option>Times New Roman</option>
                            </select>
                        </div>
                        <div className="col-md-2">
                            <select className="form-control" onChange={(e) => formatDoc('fontsize', e.target.value)}>
                                <option className="heading" selected>- размер -</option>
                                <option value="1">Малюсенький</option>
                                <option value="2">Маленький</option>
                                <option value="3">Нормальный</option>
                                <option value="4">Большеват</option>
                                <option value="5">Большой</option>
                                <option value="6">Большущий</option>
                                <option value="7">Огромный</option>
                            </select>
                        </div>
                        <div className="col-md-2">
                            <select className="form-control" onChange={(e) => formatDoc('forecolor', e.target.value)}>
                                <option className="heading" selected>- цвет -</option>
                                <option value="red">Красный</option>
                                <option value="blue">Синий</option>
                                <option value="green">Зелёный</option>
                                <option value="black">Чёрный</option>
                            </select>
                        </div>
                        <div className="col-md-2">
                            <select className="form-control" onChange={(e) => formatDoc('backcolor', e.target.value)}>
                                <option className="heading" selected>- фон -</option>
                                <option value="#faa">Красень</option>
                                <option value="#afa">Зелень</option>
                                <option value="#aaf">Синь</option>
                            </select>
                        </div>
                    </div>
                    <div id="toolBar2">
                        <img className="intLink" alt="formatDoc" title="Назад" onClick={() => formatDoc('undo')}
                             src={undoIcon}/>
                        <img className="intLink" alt="formatDoc" title="Вперёд" onClick={() => formatDoc('redo')}
                             src={redoIcon}/>
                        <img className="intLink" alt="formatDoc" title="Жирный" onClick={() => formatDoc('bold')}
                             src={fontBold}/>
                        <img className="intLink" alt="formatDoc" title="Italic" onClick={() => formatDoc('italic')}
                             src={fontItalic}/>
                        <img className="intLink" alt="formatDoc" title="Подчёркивание"
                             onClick={() => formatDoc('underline')} src={fontUnderline}/>
                        <img className="intLink" alt="formatDoc" title="Удалить отступ"
                             onClick={() => formatDoc('outdent')} src={fontOutDent}/>
                        <img className="intLink" alt="formatDoc" title="Добавить отступ"
                             onClick={() => formatDoc('indent')} src={fontInDent}/>
                        <img className="intLink" alt="formatDoc" title="Гиперссылка" onClick={() => createLink()}
                             src={LinkIcon}/>
                    </div>
                    <div id="textBox" suppressContentEditableWarning={true} contentEditable="true"/>
                </div>*/}
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
