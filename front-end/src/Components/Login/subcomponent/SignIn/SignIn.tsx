import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';

import style from './SignIn.module.scss'
import block from 'bem-css-modules'

import { Navigate } from 'react-router-dom';
import { useUserLoginMutation } from '../../../../Redux/Services/UserApi';

const b = block(style)

const SignIn = () => {

    const [formObj, setFormObj] = useState<{ email: string, password: string }>({ email: "qwe@qwe.pl", password: "1qaz@WSX" })
    const [infoLogin, setinfoLogin] = useState<{ timeLogin: boolean, errorLogin: string }>({ timeLogin: false, errorLogin: '' })

    const [loginApi, { data: dataLogin, isSuccess, isLoading, isError }] = useUserLoginMutation({
        fixedCacheKey: "login"
    });

    // eslint-disable-next-line
    const validatedEmail = (str: string) => (!/(\.{2}|-{2}|_{2})/.test(str) && /^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/.test(str));

    const validatePassword = (toVerified: string) => {
        const regularExpression = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{4,16}$/;
        return (Boolean(toVerified.match(regularExpression)))
    }

    const handleChangeForm = (e: any) => {
        setFormObj(state => ({
            ...state, [e.target.name]: e.target.value,
        }))
    }

    const handleLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validatedEmail(formObj.email) && validatePassword(formObj.password)) {
            const userLoginData = {
                email: formObj.email,
                password: formObj.password
            }

            loginApi(userLoginData)
                .unwrap()
                .catch((res) => {
                    setinfoLogin(state => ({ ...state, errorLogin: res.data.message, timeLogin: true }))
                    setTimeout(() => { setinfoLogin(state => ({ ...state, timeLogin: true })) }, 5000)
                })
            console.log('zalogowany')
        } else {
            console.log('nie zalogowany')
        }
    }

    const LoginConditionError = () => {
        if (isError && infoLogin.timeLogin) {
            return true
        } else {
            return false
        }
    }

    useEffect(() => {
        isSuccess && localStorage.setItem('user', JSON.stringify({ email: formObj.email, password: formObj.password }))
        // eslint-disable-next-line
    }, [isSuccess])

    return (
        <section className={b()}>
            <h2 className={b('title')}>Sing in</h2>

            {LoginConditionError() && <h4 className={b('info')}>{infoLogin.errorLogin}</h4>}

            <form onSubmit={handleLogin} name='login' className={b('form')}>
                <input required name='email' type="email" autoComplete='email' placeholder='e-mail' onChange={handleChangeForm} value={formObj.email} className={b('form__input')} />

                <input required name='password' type="password" placeholder='password' autoComplete='current-password' onChange={handleChangeForm} value={formObj.password} className={b('form__input')} />

                <button className={b('form__signIn-btn')} type='submit'>Log in</button>
            </form>

            {(!isLoading && dataLogin?.login) && <Navigate to="/Account" />}
        </section>
    )
}

export default SignIn;