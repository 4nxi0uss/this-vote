import { Link } from 'react-router-dom';


import style from './Header.module.scss'
import block from 'bem-css-modules'
import { useUserLoginMutation, useUserLogoutMutation } from '../../Redux/Services/UserApi';

const b = block(style);

const Header = () => {

    // eslint-disable-next-line
    const [loginApi, { data: dataLogin, isLoading }] = useUserLoginMutation({
        fixedCacheKey: "login"
    });

    const [logout] = useUserLogoutMutation()

    const handleLogout = () => {
        window.localStorage.clear();
        window.location.reload();
        window.location.replace('/');
        logout(dataLogin?.rows[0].user_id)
    }

    return (
        <header className={b()}>
            <h1 className={b('title')} > <Link to='/' className={b('link')}>ThisVote!!</Link></h1>
            <nav className={b('nav')}>
                <Link to='/' className={b('nav-link')}>
                    Home
                </Link>
                {!isLoading && dataLogin?.login ? <Link to='/Account' className={b('nav-link')}>
                    Account
                </Link> : null}
                {!isLoading && dataLogin?.login ? <Link to='/Polls' className={b('nav-link')}>
                    Polls
                </Link> : null}
                {!isLoading && !dataLogin?.login ? <Link to='/login' className={b('nav-link')}>
                    Login/Registry
                </Link> : <button className={b('nav-link')} onClick={handleLogout}>Logout</button>}
            </nav>
        </header>
    )
}

export default Header;