import { useState } from 'react';

import style from './Login.module.scss'
import block from 'bem-css-modules'

import SignIn from './subcomponent/SignIn/SignIn';
import SignUp from './subcomponent/SignUp/SignUp';

const b = block(style)

const Login = () => {

    const [toggleRegistry, setToggleRegistry] = useState<boolean>(false);

    const handleToggleRegistry = () => {
        setToggleRegistry(!toggleRegistry)
    }

    return (
        <section className={b()}>

            {!toggleRegistry ? <SignIn /> : <SignUp />}
            <p className={b('paragraph')}>{toggleRegistry ? "If you have account, please " : "If you don't have account, please"} <button className={b('paragraph', { btn: true })} onClick={handleToggleRegistry}> {!toggleRegistry ? "register now." : "log into it here."} </button></p>
        </section>
    )
}

export default Login;