import axios from "axios";
import React, {useState} from "react";
import Auth from "./Auth";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

export const client = axios.create({
    baseURL: "http://127.0.0.1:8000"
});

function App() {
    const [currentUser, setCurrentUser] = useState();

    if (currentUser) {
        return (
            <div>
                <h1>Hello</h1>
            </div>
        );
    }
    return <Auth setCurrentUser={setCurrentUser}/>
}

export default App;
