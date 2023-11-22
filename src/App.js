import './App.css';
import React from 'react';
import { useState } from 'react'

function Input({ label, id, type, handler, number }) {
    return (
        <div className="input-field">
            <p className="label standard-font">{label}</p>
            <input required className="input" type={type} id={id} onChange={(e) => handler(e.target.value, number)}/>
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
    const [correctInputs, setCorrectInputs] = useState(new Array(5).fill(false));
    const [disabled, setDisabled] = useState(true);

    const handle = (text, number) => {
        let newArray = correctInputs;
        newArray[number] = text.length !== 0;
        setCorrectInputs(newArray);
        setDisabled(correctInputs.some((x) => !x));
    };

  return (
    <div id="container">
        <div id="vertical-center">
            <div>
                <h1 id="registration-header">Регистрация</h1>
            </div>
            <form method="POST">
                <Input label={"Почта"} id={"post"} type={"text"} handler={handle} number={0}/>
                <Input label={"Логин"} id={"login"} type={"text"} handler={handle} number={1}/>
                <Input label={"Пароль"} id={"password"} type={"password"} handler={handle} number={2}/>
                <Input label={"Возраст"} id={"age"} type={"number"} handler={handle} number={3}/>
                <Input label={"Страна проживания"} id={"country"} type={"text"} handler={handle} number={4}/>
                <Button isDisabled={disabled}/>
            </form>
        </div>
    </div>
  );
}

export default Registration;
