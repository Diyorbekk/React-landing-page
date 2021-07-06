import React from 'react'
import undoIcon from "../../../assets/img/icons/undo.gif";
import redoIcon from "../../../assets/img/icons/redo.gif";
import fontBold from "../../../assets/img/icons/font-bold.gif";
import fontItalic from "../../../assets/img/icons/font-italic.gif";
import fontUnderline from "../../../assets/img/icons/font-underline.gif";
import fontOutDent from "../../../assets/img/icons/outdent.gif";
import fontInDent from "../../../assets/img/icons/indent.gif";
import LinkIcon from "../../../assets/img/icons/link.gif";
import $ from 'jquery';
window.jQuery = $;
window.$ = $;

function isInvalid({valid, touched, shouldValidate}) {
    return !valid && shouldValidate && touched
}


function TextArea(props) {
    const cls = ["form-group"];

    if (isInvalid(props)) {
        cls.push("text-danger")
    }

    let sLnk;
    let selection

    function formatDoc(sCmd, sValue) {
        document.execCommand(sCmd, false, sValue)
    }

    function createLink() {
        // eslint-disable-next-line
        sLnk = prompt('Введите ваш URL', 'http:\/\/')
        selection = document.getSelection();

        let wrappedSelection = `<a href='${sLnk}' class="link-target" target="_blank">${selection}</a>`;
        // eslint-disable-next-line
        if (sLnk && sLnk != '' && sLnk != 'http://') {
            /*formatDoc('createlink', sLnk)*/
            document.execCommand('insertHTML', false, wrappedSelection);
        }
    }

    return (


        <div className={cls.join(' ')}>
            <label>{props.label}</label>
            <div id="toolBar1" className="row">
                <div className="col-md-3">
                    <select className="form-control"
                            onChange={(e) => formatDoc('formatblock', e.target.value)}>
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
                <div className="col-md-3">
                    <select className="form-control"
                            onChange={(e) => formatDoc('fontsize', e.target.value)}>
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
                <div className="col-md-3">
                    <select className="form-control"
                            onChange={(e) => formatDoc('forecolor', e.target.value)}>
                        <option className="heading" selected>- цвет -</option>
                        <option value="red">Красный</option>
                        <option value="blue">Синий</option>
                        <option value="green">Зелёный</option>
                        <option value="black">Чёрный</option>
                        <option value="white">Белый</option>
                    </select>
                </div>
                <div className="col-md-3">
                    <select className="form-control"
                            onChange={(e) => formatDoc('backcolor', e.target.value)}>
                        <option className="heading" selected>- фон -</option>
                        <option value="#faa">Красень</option>
                        <option value="#afa">Зелень</option>
                        <option value="#aaf">Синь</option>
                    </select>
                </div>
            </div>
            <div id="toolBar2">
                <img className="intLink" alt="formatDoc" title="Назад"
                     onClick={() => formatDoc('undo')}
                     src={undoIcon}/>
                <img className="intLink" alt="formatDoc" title="Вперёд"
                     onClick={() => formatDoc('redo')}
                     src={redoIcon}/>
                <img className="intLink" alt="formatDoc" title="Жирный"
                     onClick={() => formatDoc('bold')}
                     src={fontBold}/>
                <img className="intLink" alt="formatDoc" title="Italic"
                     onClick={() => formatDoc('italic')}
                     src={fontItalic}/>
                <img className="intLink" alt="formatDoc" title="Подчёркивание"
                     onClick={() => formatDoc('underline')} src={fontUnderline}/>
                <img className="intLink" alt="formatDoc" title="Удалить отступ"
                     onClick={() => formatDoc('outdent')} src={fontOutDent}/>
                <img className="intLink" alt="formatDoc" title="Добавить отступ"
                     onClick={() => formatDoc('indent')} src={fontInDent}/>
                <img className="intLink" alt="formatDoc" title="Гиперссылка"
                     onClick={() => createLink()}
                     src={LinkIcon}/>
            </div>
            <div id="textBox" suppressContentEditableWarning={true} contentEditable="true"
                 ref={props.inputRef} onInput={props.onInput} onChange={props.onChange}/>

            {props.errorMessage === null ?
                null
                : <span className="text-danger bg-transparent my-0">{props.errorMessage}</span>
            }
        </div>
    );
}

export default TextArea