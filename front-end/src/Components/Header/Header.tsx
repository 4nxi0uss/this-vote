import * as React from 'react';

import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../Redux/Hooks/hooks';
import { clearInfo, clearStatus } from '../../Redux/Slice/accountSlice';

import './Header.scss'
const Header = () => {
    const dispatch = useAppDispatch();
    const { infoLogin } = useAppSelector(state => state.users)

    const handleLogout = () => {
        window.localStorage.clear();
        window.location.reload();
        window.location.replace('/');
        dispatch(clearStatus);
        dispatch(clearInfo);
    }

    return (
        <header className='header'>
            <h1 className='title'>ThisVote!!</h1>
            <nav>
                <Link to='/' className='NavLink'>
                    Home
                </Link>
                {infoLogin.login ? <Link to='/Account' className='NavLink'>
                    Account
                </Link> : null}
                {infoLogin.login ? <Link to='/Polls' className='NavLink'>
                    Polls
                </Link> : null}
                {!infoLogin.login ? <Link to='/login' className='NavLink'>
                    Login/Registry
                </Link> : <button className='NavLink' onClick={handleLogout}>Logout</button>}
            </nav>
        </header>
    )
}

export default Header;