import * as React from 'react';
import { Link } from 'react-router-dom';

import './Header.scss'
const Header = () => {
    return (
        <header className='header'>
            <h1 className='title'>ThisVote!!</h1>
            <nav>
                <Link to='/' className='NavLink'>
                    Home
                </Link>
                <Link to='/Account' className='NavLink'>
                    Account
                </Link>
                <Link to='/login' className='NavLink'>
                    Login/Registry
                </Link>
            </nav>
        </header>
    )
}

export default Header;