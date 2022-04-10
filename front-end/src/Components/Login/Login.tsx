import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

import './Login.scss'

import { fetchUsersLogin } from '../../Redux/Slice/accountSlice';
import { useAppDispatch, useAppSelector } from '../../Redux/Hooks/hooks';
import { Navigate } from 'react-router-dom';
import { fetchPostRegister } from '../../Redux/Slice/registerSlice';


const Login = () => {

    const [toggleRegistry, setToggleRegistry] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("qwe@qwe.pl");
    const [password, setPassword] = useState<string>("1qaz@WSX");
    const [secondPassword, setSecondPassword] = useState<string>("");

    const { infoLogin } = useAppSelector((state) => state.users);

    const dispatch = useAppDispatch();

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
            const userLoginData = {
                email,
                password
            }
            dispatch<any>(fetchUsersLogin(userLoginData))

            console.log('zalogowany')
            setEmail('');
            setPassword('');

        } else {
            console.log('nie zalogowany')
        }
    }


    const handleRegistry = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const registerData = {
            email: email,
            password: password
        }

        if (validatedEmail(email) && validatePassword(password) && (password === secondPassword)) {

            console.log(dispatch<any>(fetchPostRegister(registerData)))
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

    return (
        <section className='loginSection'>
            <h2 className='loginTitle'>{!toggleRegistry ? "Sing in" : "Register"}</h2>
            <form onSubmit={toggleRegistry ? handleRegistry : handleLogin} className='loginForm'>
                <input required type="email" placeholder='e-mail' onChange={handleEmail} value={email} />
                <input required type="password" placeholder='password' onChange={handlePassword} value={password} />
                {!toggleRegistry ? null : <input type='password' placeholder='repeat password' onChange={handleSecondPassword} value={secondPassword} />}
                <button className='loginBtn' type='submit'>{toggleRegistry ? "Register" : "Log in"}</button>
            </form>
            <p className="toRegistryParagraph">{toggleRegistry ? "If you have account, please " : "If you don't have account, please"} <button className='toRegistryBtn' onClick={handleToggleRegistry}> {!toggleRegistry ? "register now." : "log into it here."} </button></p>
            {infoLogin.login ? <Navigate to="/Account" /> : null}
        </section>
    )
}

export default Login;