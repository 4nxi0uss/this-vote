import { Link } from 'react-router-dom';

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

    // eslint-disable-next-line
    const [loginApi, { data: dataLogin, isLoading, isSuccess }] = useUserLoginMutation({
        fixedCacheKey: "login"
    });

    const [logout] = useUserLogoutMutation()

    const handleLogout = () => {
        handleLogoutConfig(logout, dataLogin?.rows[0].user_id)
    }

    return (
        <header className={b()}>
            <h1 className={b('title')} > <Link to='/' className={b('title__link')}>ThisVote!!</Link></h1>
            <nav className={b('nav')}>
                <Link to='/' className={b('nav__link')}>
                    Home
                </Link>
                {!isLoading && dataLogin?.login && <Link to='/Account' className={b('nav__link', { mark: true })}>
                    Account
                </Link>}
                {!isLoading && dataLogin?.login && <Link to='/Polls' className={b('nav__link')}>
                    Polls
                </Link>}
                {!isSuccess && !dataLogin?.login ? <Link to='/login' className={b('nav__link')}>
                    Login/Registry
                </Link> : <button className={b('nav__link')} onClick={handleLogout}>Logout</button>}
            </nav>
        </header>
    )
}

export default Header;