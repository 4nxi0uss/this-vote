import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../Redux/Hooks/hooks';
import { clearInfo, clearStatus } from '../../Redux/Slice/usersLoginSlice';

import style from './Header.module.scss'
import block from 'bem-css-modules'

const b = block(style);

const Header = () => {
    const dispatch = useAppDispatch();
    const { infoLogin } = useAppSelector(state => state.usersLogin)

    const handleLogout = () => {
        window.localStorage.clear();
        window.location.reload();
        window.location.replace('/');
        dispatch(clearStatus);
        dispatch(clearInfo);
    }

    return (
        <header className={b()}>
            <h1 className={b('title')}>ThisVote!!</h1>
            <nav>
                <Link to='/' className={b('nav-link')}>
                    Home
                </Link>
                {infoLogin.login ? <Link to='/Account' className={b('nav-link')}>
                    Account
                </Link> : null}
                {infoLogin.login ? <Link to='/Polls' className={b('nav-link')}>
                    Polls
                </Link> : null}
                {!infoLogin.login ? <Link to='/login' className={b('nav-link')}>
                    Login/Registry
                </Link> : <button className={b('nav-link')} onClick={handleLogout}>Logout</button>}
            </nav>
        </header>
    )
}

export default Header;