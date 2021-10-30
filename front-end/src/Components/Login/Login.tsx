import { useState } from 'react';
import type { /*MouseEvent,*/ ChangeEvent, FormEvent } from 'react';

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
        let isTrueLetter = false;
        let isTrueNumber = false;

        toVerified.split('').forEach((letter) => { if (letter === letter.toUpperCase() && letter !== '0') isTrueLetter = Boolean(toVerified.includes(letter)) });
        toVerified.split('').forEach((letter) => { (Boolean(Number(letter)) === true || Number(letter) === 0) ? (isTrueNumber = true) : (isTrueNumber = false) });

        return (isTrueLetter && isTrueNumber)
    }
    const handleToggleRegistry = () => {
        setToggleRegistry(!toggleRegistry)
    }

    const handleLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validatedEmail(email) && validatePassword(password)) {
            console.log('zalogowany')
        } else {
            console.log('nie zalogowany')
        }
    }

    const handleRegistry = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        validatedEmail(email)

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