import React, {useContext, useState} from 'react';
import Logo from "../Logo";
import Button from "../Button";
import {Context} from "../../index";
import Container from "../layout/Container";

const Login = () => {

    const {store} = useContext(Context);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        store.login(username, password);
    }

    return (
        <Container>
            <Logo />
            <div className="home-title">Вход</div>
            <input className="field" name='username' value={username} onChange={(e) => setUsername(e.target.value)}/>
            <input className="field" name='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            <Button style={{marginTop: 20}} onClick={handleSubmit}>Войти</Button>
        </Container>
    );
};

export default Login;