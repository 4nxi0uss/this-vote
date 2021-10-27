import * as React from 'react';

import './Header.scss'

const Header = () => {
    return (
        <header className='header'>
            <h1 className='title'>ThisVote!!</h1>
            <div>
                <button className='loginBtn'>
                    login/registry
                </button>
            </div>
        </header>
    )
}

export default Header;