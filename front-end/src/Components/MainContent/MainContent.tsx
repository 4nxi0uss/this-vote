import { useEffect } from 'react';

import { Route, Routes, useLocation, useNavigate } from 'react-router';

import style from './MainContent.module.scss';
import block from 'bem-css-modules'

import Introduction from './subcoponent/Introduction/Introduction';
import Login from '../Login/Login';
import Account from '../Account/Account';

import PollsList from '../Polls/PollsList';
import NotFound from '../NotFound/NotFount';

const b = block(style)

const MainContent = () => {

    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (!Boolean(localStorage.getItem('user')) && location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/not-found') {
            navigate('/')
        }
        // eslint-disable-next-line
    }, [])

    return (
        <main className={b()}>
            <Routes>
                <Route path='/' element={<Introduction />} />
                <Route path='/Login' element={<Login />} />
                <Route path='/Account' element={<Account />} />
                <Route path='/Polls' element={<PollsList />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </main>
    )
}

export default MainContent;