import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

import './Login.scss'

import { fetchUsersLogin } from '../../Redux/Slice/accountSlice';
import { useAppDispatch, useAppSelector } from '../../Redux/Hooks/hooks';

import { Redirect } from 'react-router';


const Login = () => {

    const [toggleRegistry, setToggleRegistry] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
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

        // console.log('email ', validatedEmail(email));
        // console.log('pass ', validatePassword(password));

        if (validatedEmail(email) && validatePassword(password)) {
            const userLoginData = {
                email,
                password
            }
            dispatch(fetchUsersLogin(userLoginData))

            // console.log(dispatch(fetchUsersLogin(userLoginData)))
            console.log('zalogowany')
            setEmail('');
            setPassword('');

            // console.log(infoLogin);
            // window.sessionStorage.setItem()
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
                })
            }).then(res => res.json()).then(data => console.table(data))
            console.log('zarejestrowano');
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
            {infoLogin.login ? <Redirect exact to="/Account" /> : null}
        </section>
    )
}

export default Login;