import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

import './Login.scss'

const Login = () => {

    const [toggleRegistry, setToggleRegistry] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [secondPassword, setSecondPassword] = useState<string>("");
    const [date, setDate] = useState<string>("");


    const validatedEmail = (toVerified: string) => {
        const atCheck = toVerified.includes("@");
        const dotCheck = (toVerified.length / 2) < toVerified.lastIndexOf('.');
        return (atCheck && dotCheck)
    }
    const validatePassword = (toVerified: string) => {
        const regularExpression = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{4,16}$/;
        return (Boolean(toVerified.match(regularExpression)))
    }

    const handleToggleRegistry = () => {
        setToggleRegistry(!toggleRegistry)
    }

    const handleLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validatedEmail(email) && validatePassword(password)) {
            fetch('http://localhost:3022/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: `${email}`,
                    password: `${password}`
                })
            }).then(res => res.json()).then(data => console.log(data))
            console.log('zalogowany')
            setEmail('');
            setPassword('');
        } else {
            console.log('nie zalogowany')
        }
    }

    const handleRegistry = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // console.log('email ', validatedEmail(email))
        // console.log('pass ', validatePassword(password))
        // console.log('pass 2 ', password === secondPassword)

        if (validatedEmail(email) && validatePassword(password) && (password === secondPassword)) {
            fetch('http://localhost:3022/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    usersEmail: `${email}`,
                    pass: `${password}`,
                    dateOfBirth: `${date}`
                })
            }).then(res => res.json()).then(data => console.log(data))
            console.log('zarejestrowano');
            setDate('');
            setEmail('');
            setPassword('');
            setSecondPassword('');
        } else {
            console.log('nie zarejestrowano')
        }
    }

    const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value.trim())
    }

    const handlePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value.trim())
    }

    const handleSecondPassword = (e: ChangeEvent<HTMLInputElement>) => {
        setSecondPassword(e.target.value.trim())
    }

    const handleDate = (e: ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value.trim())
    }

    const TodayDate = new Date();

    return (
        <section className='loginSection'>
            <h2 className='loginTitle'>{!toggleRegistry ? "Sing in" : "Register"}</h2>
            <form onSubmit={toggleRegistry ? handleRegistry : handleLogin} className='loginForm'>
                <input required type="email" placeholder='e-mail' onChange={handleEmail} value={email} />
                <input required type="password" placeholder='password' onChange={handlePassword} value={password} />
                {!toggleRegistry ? null : <input type='password' placeholder='repeat password' onChange={handleSecondPassword} value={secondPassword} />}
                {!toggleRegistry ? null : <label>Date of birth</label>}
                {!toggleRegistry ? null : <input type="date" max={`${TodayDate.getFullYear()}-${TodayDate.getMonth() + 1}-${TodayDate.getDate()}`} onChange={handleDate} value={date} />}
                <button className='loginBtn' type='submit'>{toggleRegistry ? "Register" : "Log in"}</button>
            </form>
            <p className="toRegistryParagraph">{toggleRegistry ? "If you have account, please " : "If you don't have account, please"} <button className='toRegistryBtn' onClick={handleToggleRegistry}> {!toggleRegistry ? "register now." : "log into it here."} </button></p>
        </section>
    )
}

export default Login;