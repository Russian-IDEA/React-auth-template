import './Auth.css';
import React from 'react';
import { useState } from 'react'

class InputFieldData {
    constructor(label, name, type, handler) {
        this.label = label;
        this.name = name;
        this.type = type;
        this.handler = handler;
    }
}

function Input({ inputFieldData, index }) {
    return (
        <div className="input-field">
            <p className="label standard-font">{inputFieldData.label}</p>
            <input required className="input" type={inputFieldData.type} name={inputFieldData.name} onInput={(e) => inputFieldData.handler(e.target.value, index)}/>
        </div>
    );
}

function Button({ isDisabled }) {
    return (
        <div>
            {isDisabled ?
                <button disabled className="input button input-field standard-font primary-button" id="registration-button" type="submit">Зарегистрироваться</button> :
                <button className="input button input-field standard-font primary-button" id="registration-button" type="submit">Зарегистрироваться</button>
            }
        </div>
    );
}

function Registration() {
    const [disabled, setDisabled] = useState(true);

    const handle = (text, index, predicate) => {
        let newArray = correctInputs;
        newArray[index] = predicate;
        setCorrectInputs(newArray);
        setDisabled(correctInputs.some((x) => !x));
    };

    let inputsData = [
        new InputFieldData("Почта", "post", "text",
            (text, index) => handle(text, index, text.length !== 0)), // условие может быть любым, для примера сделал проверку на пустую строку
        new InputFieldData("Логин", "login", "text",
            (text, index) => handle(text, index, text.length !== 0)),
        new InputFieldData("Пароль", "password", "password",
            (text, index) => handle(text, index, text.length !== 0)),
        new InputFieldData("Возраст", "age", "number",
            (text, index) => handle(text, index, text.length !== 0)),
        new InputFieldData("Страна проживания", "country", "text",
            (text, index) => handle(text, index, text.length !== 0))
    ];

    const [correctInputs, setCorrectInputs] = useState(new Array(inputsData.length).fill(false));

  return (
    <div className="container">
        <div className="vertical-center">
            <div>
                <h1 id="registration-header">Регистрация</h1>
            </div>
            <form method="POST">
                {
                    inputsData.map((value, index) =>
                    <Input inputFieldData={value} index={index} key={index}/>)
                }
                <Button isDisabled={disabled}/>
            </form>
        </div>
    </div>
  );
}

export default Registration;
