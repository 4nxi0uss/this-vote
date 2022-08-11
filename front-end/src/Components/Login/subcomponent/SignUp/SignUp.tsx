import { useState } from 'react';
import type { FormEvent } from 'react';

import style from './SignUp.module.scss'
import block from 'bem-css-modules'

import { useUserRegisteryMutation } from '../../../../Redux/Services/UserApi';

const b = block(style)

const SignUp = () => {

    const [formObj, setFormObj] = useState({ email: "", password: "", secondPassword: "" })
    const [infoSingUpObj, setinfoSingUpObj] = useState<{ timeSingUp: boolean, errorSingUp: string }>({ timeSingUp: false, errorSingUp: '' })

    const [registerApi, { isError: isErr }] = useUserRegisteryMutation();

    const validatedEmail = (toVerified: string) => {
        const atCheck = toVerified.includes("@");
        const dotCheck = (toVerified.length / 2) < toVerified.lastIndexOf('.');
        return (atCheck && dotCheck)
    }

    const validatePassword = (toVerified: string) => {
        const regularExpression = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{4,16}$/;
        return (Boolean(toVerified.match(regularExpression)))
    }

    const handleChangeForm = (e: any) => {
        setFormObj(state => ({
            ...state, [e.target.name]: e.target.value,
        }))
    }

    const handleRegistry = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const registerData = {
            email: formObj.email,
            password: formObj.password
        }

        if (validatedEmail(formObj.email) && validatePassword(formObj.password) && (formObj.password === formObj.secondPassword)) {
            registerApi(registerData)
                .unwrap()
                .catch((res) => {
                    setinfoSingUpObj(state => ({ ...state, errorSingUp: res.data.message, timeSingUp: true }))
                    setTimeout(() => { setinfoSingUpObj(state => ({ ...state, timeSingUp: false })) }, 5000)
                })
            setFormObj(state => ({ ...state, email: '', password: '', secondPassword: '' }))
        } else {
            console.log('nie zarejestrowano')
        }
    }

    const signUpConditionError = () => {
        if (isErr && infoSingUpObj.timeSingUp) {
            return true
        } else {
            return false
        }
    }

    return (
        <section className={b()}>
            <h2 className={b('title')}>Sing up</h2>

            {signUpConditionError() && <h4 className={b('info')}>{infoSingUpObj.errorSingUp}</h4>}

            <form onSubmit={handleRegistry} name='signUp' className={b('form')}>
                <input required name='email' type="email" autoComplete='email' placeholder='e-mail' onChange={handleChangeForm} value={formObj.email} className={b('form__input')} />
                <div className={b('form__password-info')}>
                    <p className={b('form__password-info__title')}>Password should have</p>
                    <ul className={b('form__password-info__list')}>
                        <li className={b('form__password-info__list__list-element')}>at least one digit</li>
                        <li className={b('form__password-info__list__list-element')}>at least one capital letter</li>
                        <li className={b('form__password-info__list__list-element')}>one special sign</li>
                        <li className={b('form__password-info__list__list-element')}>small letters</li>
                    </ul>
                </div>

                <input required name='password' type="password" placeholder='password' autoComplete='current-password' onChange={handleChangeForm} value={formObj.password} className={b('form__input')} />

                <input type='password' name='secondPassword' autoComplete='new-password' placeholder='repeat password' onChange={handleChangeForm} value={formObj.secondPassword} className={b('form__input')} />

                <button className={b('form__signUp-btn')} type='submit'>Sign up</button>
            </form>

        </section>
    )
}

export default SignUp;