import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

import style from './Login.module.scss'
import block from 'bem-css-modules'

import { Navigate } from 'react-router-dom';
import { useUserLoginMutation, useUserRegisteryMutation } from '../../Redux/Services/UserApi';

const b = block(style)

const Login = () => {

    const [toggleRegistry, setToggleRegistry] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("qwe@qwe.pl");
    const [password, setPassword] = useState<string>("1qaz@WSX");
    const [secondPassword, setSecondPassword] = useState<string>("");
    const [errorRegister, setErrorRegister] = useState<string>("");
    const [errorLogin, setErrorLogin] = useState<string>("");
    const [timeLogin, setTimeLogin] = useState<boolean>(false);
    const [timeRegister, setTimeRegister] = useState<boolean>(false);

    const [loginApi, { data: dataLogin, isLoading, isSuccess: isLoginSucces, isError }] = useUserLoginMutation({
        fixedCacheKey: "login"
    });

    const [registerApi, { isSuccess, isError: isErr }] = useUserRegisteryMutation();

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
            loginApi(userLoginData)
                .unwrap()
                .catch((res) => {
                    setErrorLogin(res.data.message)
                    setTimeLogin(true)
                    setTimeout(() => { setTimeLogin(false) }, 5000)
                })
            console.log('zalogowany')
        } else {
            console.log('nie zalogowany')
        }
    }

    isLoginSucces && localStorage.setItem('user', JSON.stringify({ email, password }))

    const handleRegistry = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const registerData = {
            email: email,
            password: password
        }

        if (validatedEmail(email) && validatePassword(password) && (password === secondPassword)) {
            registerApi(registerData)
                .unwrap()
                .catch((res) => {
                    setErrorRegister(res.data.message)
                    setTimeRegister(true)
                    setTimeout(() => { setTimeRegister(false) }, 5000)
                })
            setEmail('');
            setPassword('');
            setSecondPassword('');
        } else {
            console.log('nie zarejestrowano')
        }
    }

    isSuccess && console.log('Rejestracja powiodła się!')

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
        <section className={b()}>
            <h2 className={b('title')}>{!toggleRegistry ? "Sing in" : "Register"}</h2>

            {isError && timeLogin && <h4 className={b('info')}>{errorLogin}</h4>}
            {isErr && timeRegister && <h4 className={b('info')}>{errorRegister}</h4>}

            <form onSubmit={toggleRegistry ? handleRegistry : handleLogin} className={b('form')}>
                <input required type="email" autoComplete='email' placeholder='e-mail' onChange={handleEmail} value={email} className={b('form__input')} />
                {toggleRegistry && <div className={b('form__password-info')}>
                    <p className={b('form__password-info__title')}>Password should have</p>
                    <ul className={b('form__password-info__list')}>
                        <li className={b('form__password-info__list__list-element')}>at least one digit</li>
                        <li className={b('form__password-info__list__list-element')}>at least one capital letter</li>
                        <li className={b('form__password-info__list__list-element')}>one special sign</li>
                        <li className={b('form__password-info__list__list-element')}>small letters</li>
                    </ul>
                </div>}
                <input required type="password" placeholder='password' autoComplete='current-password' onChange={handlePassword} value={password} className={b('form__input')} />
                {toggleRegistry && <input type='password' autoComplete='new-password' placeholder='repeat password' onChange={handleSecondPassword} value={secondPassword} className={b('form__input')} />}
                <button className={b('form__login-btn')} type='submit'>{toggleRegistry ? "Register" : "Log in"}</button>
            </form>
            <p className={b('paragraph')}>{toggleRegistry ? "If you have account, please " : "If you don't have account, please"} <button className={b('paragraph', { btn: true })} onClick={handleToggleRegistry}> {!toggleRegistry ? "register now." : "log into it here."} </button></p>
            {(!isLoading && dataLogin?.login) && <Navigate to="/Account" />}
        </section>
    )
}

export default Login;