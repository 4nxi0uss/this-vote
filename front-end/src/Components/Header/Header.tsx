import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import style from './Header.module.scss'
import block from 'bem-css-modules'
import { useUserLoginMutation, useUserLogoutMutation } from '../../Redux/Services/UserApi';

const b = block(style);

export const handleLogoutConfig = (logout: any, userId: string) => {
    window.sessionStorage.clear();
    window.localStorage.clear();
    window.location.reload();
    window.location.replace('/');
    logout(userId)
}

const Header = () => {

    const [mobileMenu, setMobileMenu] = useState<boolean>(false)

    const location = useLocation();

    // eslint-disable-next-line
    const [loginApi, { data: dataLogin, isLoading, isSuccess }] = useUserLoginMutation({
        fixedCacheKey: "login"
    });

    const [logout] = useUserLogoutMutation()

    const handleLogout = () => {
        handleLogoutConfig(logout, String(dataLogin?.rows[0].user_id))
    }

    const handleMobileMenu = () => {
        setMobileMenu((state) => state = !state);
    }

    return (
        <header className={b()}>
            <h1 className={b('title')} > <Link to='/' className={b('title__link')}>ThisVote!!</Link></h1>
            <nav onClick={handleMobileMenu} className={b('nav-mobile')}>
                {mobileMenu && <div className={b('nav-mobile__menu')}>
                    <Link to='/' className={b('nav-mobile__menu__link')}>
                        Home
                    </Link>
                    {!isLoading && dataLogin?.login && <Link to='/Account' className={b('nav-mobile__menu__link')}>
                        Account
                    </Link>}
                    {!isLoading && dataLogin?.login && <Link to='/Polls' className={b('nav-mobile__menu__link')}>
                        Polls
                    </Link>}
                    {!isSuccess && !dataLogin?.login ? <Link to='/login' className={b('nav-mobile__menu__link')}>
                        Login/Registry
                    </Link> : <button className={b('nav-mobile__menu__link')} onClick={handleLogout}>Logout</button>}
                </div>}
            </nav>

            <nav className={b('nav')}>
                <Link to='/' className={b('nav__link', { mark: location.pathname === '/' })}>
                    Home
                </Link>
                {!isLoading && dataLogin?.login && <Link to='/Account' className={b('nav__link', { mark: location.pathname === '/Account' })}>
                    Account
                </Link>}
                {!isLoading && dataLogin?.login && <Link to='/Polls' className={b('nav__link', { mark: location.pathname === '/Polls' })}>
                    Polls
                </Link>}
                {!isSuccess && !dataLogin?.login ? <Link to='/login' className={b('nav__link', { mark: location.pathname === '/login' })}>
                    Login/Registry
                </Link> : <button className={b('nav__link')} onClick={handleLogout}>Logout</button>}
            </nav>
        </header>
    )
}

export default Header;