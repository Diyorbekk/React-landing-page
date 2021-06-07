import React, {useState} from 'react';
import {storage} from "../../util/firebase";
import InputFile from "../UI/InputFileAdmin/InputFile";
import Input from "../UI/InputAdmin/Input";
import TextArea from "../UI/TextAreaAdmin/TextArea";
import $ from "jquery";

function Panel({handleLogOut}) {

    const [image, setImage] = useState(null)
    const [url, setUrl] = useState("");
    const [staticImage, setStaticImage] = useState("");
    const [progress, setProgress] = useState(0);

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

                <div className="row">
                    <div className="col-12">
                        <InputFile legend="Slide image" file={staticImage} label="Select file" onChange={handleChange}/>
                        <br/>
                        <Input label="Title"/>
                        <br/>
                        <TextArea label="Text" row="10"/>
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
                </div>

            </div>
        </section>
    );
}

export default Panel;