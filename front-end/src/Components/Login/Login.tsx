import { useState } from 'react';
import type { MouseEvent, ChangeEvent } from 'react';
import './Login.scss'

const Login = () => {

    const [toggleRegistry, setToggleRegistry] = useState<boolean>(false);
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [secondPassword, setSecondPassword] = useState<string>();
    const [date, setDate] = useState<string>();

    console.log(toggleRegistry)

    const handleToggleRegistry = () => {
        setToggleRegistry(!toggleRegistry)
    }

    const handleLogin = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
    }

    const handleRegistry = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

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

    console.log(password, email, secondPassword, date)

    const TodayDate = new Date();

    return (
        <section className='loginSection'>
            <h2 className='loginTitle'>{!toggleRegistry ? "Sing in" : "Register"}</h2>
            <form className='loginForm'>
                <input type="email" placeholder='e-mail' onChange={handleEmail} value={email} />
                <input type="password" placeholder='password' onChange={handlePassword} value={password} />
                {!toggleRegistry ? null : <input type='password' placeholder='repeat password' onChange={handleSecondPassword} value={secondPassword} />}
                {!toggleRegistry ? null : <label>Date of birth</label>}
                {!toggleRegistry ? null : <input type="date" max={`${TodayDate.getFullYear()}-${TodayDate.getMonth() + 1}-${TodayDate.getDate()}`} onChange={handleDate} value={date} />}
                <button className='loginBtn' onClick={toggleRegistry ? handleRegistry : handleLogin}>{toggleRegistry ? "Register" : "Log in"}</button>
            </form>
            <p className="toRegistryParagraph">{toggleRegistry ? "If you have account, please " : "If you don't have account, please"} <button className='toRegistryBtn' onClick={handleToggleRegistry}> {!toggleRegistry ? "register now." : "log into it here."} </button></p>
        </section>
    )
}

export default Login;