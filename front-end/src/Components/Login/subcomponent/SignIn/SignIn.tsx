import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';

import style from './SignIn.module.scss'
import block from 'bem-css-modules'

import { Navigate } from 'react-router-dom';
import { useUserLoginMutation } from '../../../../Redux/Services/UserApi';

const b = block(style)

const SignIn = () => {

    const [formObj, setFormObj] = useState<{ email: string, password: string }>({ email: "qwe@qwe.pl", password: "1qaz@WSX" })
    const [infoSignIn, setinfoSignIn] = useState<{ timeSignIn: boolean, errorSignIn: string }>({ timeSignIn: false, errorSignIn: '' })

    const [loginApi, { data: dataLogin, isSuccess, isLoading, isError }] = useUserLoginMutation({
        fixedCacheKey: "login"
    });

    const handleChangeForm = (e: any) => {
        setFormObj(state => ({
            ...state, [e.target.name]: e.target.value,
        }))
    }

    const handleLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const userLoginData = {
            email: formObj.email,
            password: formObj.password
        }

        loginApi(userLoginData)
            .unwrap()
            .catch((res) => {
                if (!res?.data?.message) {
                    setinfoSignIn(state => ({ ...state, errorSignIn: 'Something go wrong, try again.', timeSignIn: true }))
                    setTimeout(() => { setinfoSignIn(state => ({ ...state, timeSignIn: false })) }, 5000)
                } else {
                    setinfoSignIn(state => ({ ...state, errorSignIn: res?.data?.message, timeSignIn: true }))
                    setTimeout(() => { setinfoSignIn(state => ({ ...state, timeSignIn: false })) }, 5000)
                }
            })
        console.log('zalogowany')
    }

    const LoginConditionError = () => {
        if (isError && infoSignIn.timeSignIn) {
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

            {LoginConditionError() && <h4 className={b('info')}>{infoSignIn.errorSignIn}</h4>}

            <form onSubmit={handleLogin} name='login' className={b('form')}>
                <input required name='email' type="email" autoComplete='email' placeholder='e-mail' onChange={handleChangeForm} value={formObj.email} className={b('form__input')} />

                <input required name='password' type="password" placeholder='password' autoComplete='current-password' onChange={handleChangeForm} value={formObj.password} className={b('form__input')} />

                <button className={b('form__signIn-btn')} type='submit'>Log in</button>
            </form>

            {(!isLoading && dataLogin?.login) && <Navigate to="/account" />}
        </section>
    )
}

export default SignIn;