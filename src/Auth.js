import './Auth.css';
import React, {useEffect} from 'react';
import { useState } from 'react'
import {client} from "./App";

class InputFieldData {
    constructor(label, name, type, value, setValue) {
        this.label = label;
        this.name = name;
        this.type = type;
        this.value = value;
        this.setValue = setValue;
    }
}

function Input({ inputFieldData }) {
    return (
        <div className="input-field">
            <p className="label standard-font">{inputFieldData.label}</p>
            <input required className="input" type={inputFieldData.type} name={inputFieldData.name} onInput={(e) => {
                inputFieldData.setValue(e.target.value);
            }} value={inputFieldData.value}/>
        </div>
    );
}

function Button({ isDisabled, text }) {
    return (
        <div>
            {isDisabled ?
                <button disabled className="input button input-field standard-font primary-button" id="auth-button" type="submit">{text}</button> :
                <button className="input button input-field standard-font primary-button" id="auth-button" type="submit">{text}</button>
            }
        </div>
    );
}

function Auth({setCurrentUser}) {
    const [registrationToggle, setRegistrationToggle] = useState(false);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        client.get("api/user")
            .then(function (res) {
                setCurrentUser(true);
            }).catch(function (error) {
                setCurrentUser(false);
            });
    }, []);

    const login = (e) => {
        e.preventDefault();
        client.post(
            "/api/login",
            {
                "email": email,
                "password": password
            }
        ).then(function (res) {
            setCurrentUser(true);
        });
    };

    const submitRegistration = (e) => {
        e.preventDefault();
        client.post(
            "/api/register",
            {
                "email": email,
                "username": username,
                "password": password
            }
        ).then(function (res) {
            login(e);
        });
    };

    if (registrationToggle) { // Регистрация
        const disabled = () => {
            return email.length === 0 || password.length === 0 || username.length === 0;
        };
        let inputsData = [
            new InputFieldData("Почта", "email", "text", email, setEmail),
            new InputFieldData("Логин", "username", "text", username, setUsername),
            new InputFieldData("Пароль", "password", "password", password, setPassword)
        ];
        return (
            <div className="container">
                <div className="vertical-center">
                    <div>
                        <h1 id="auth-header">Регистрация</h1>
                    </div>
                    <form method="POST" onSubmit={(e) => submitRegistration(e)}>
                        {
                            inputsData.map((value, index) =>
                                <Input inputFieldData={value} index={index} key={index}/>)
                        }
                        <Button isDisabled={disabled()} text={"Зарегистрироваться"}/>
                    </form>
                    <button onClick={() => setRegistrationToggle(false)}>Войти</button>
                </div>
            </div>
        );
    } else { // Авторизация
        const disabled = () => {
            return password.length === 0 || email.length === 0;
        };
        let inputsData = [
            new InputFieldData("Почта", "email", "text", email, setEmail),
            new InputFieldData("Пароль", "password", "password", password, setPassword)
        ];
        return (
            <div className="container">
                <div className="vertical-center">
                    <div>
                        <h1 id="auth-header">Вход</h1>
                    </div>
                    <form method="POST" onSubmit={(e) => login(e)}>
                        {
                            inputsData.map((value, index) =>
                                <Input inputFieldData={value} index={index} key={index}/>)
                        }
                        <Button isDisabled={disabled()} text={"Войти"}/>
                    </form>
                    <button onClick={() => setRegistrationToggle(true)}>Зарегистрироваться</button>
                </div>
            </div>
        );
    }
}

export default Auth;
