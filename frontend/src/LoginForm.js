import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./App.css";
import users from './users'; 

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        if (username === users.ADMIN_USERNAME && password === users.ADMIN_PASSWORD) {
            console.log("Logged in as admin");
            navigate('/Dashboard');
        } else {
            setError("Invalid username or password");
        }
    };

    return (
        <div className="page">
        <div className="cover">
            <h1>Kirjaudu sisään</h1>
            <input type="text" placeholder="käyttäjänimi" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="salasana" value={password} onChange={(e) => setPassword(e.target.value)} />
            <div className="login-btn" onClick={handleLogin}>
                Kirjaudu
            </div>
        </div>
        </div>
    );
};

export default LoginForm;
