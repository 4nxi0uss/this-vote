import { Route, Routes } from 'react-router';
import { Navigate } from 'react-router-dom';

import style from './MainContent.module.scss';
import block from 'bem-css-modules'

import Introduction from './subcoponent/Introduction/Introduction';
import Login from '../Login/Login';
import Account from '../Account/Account';
import Polls from '../Polls/Polls';

import { useUserLoginMutation } from '../../Redux/Services/UserApi';

const b = block(style)

const MainContent = () => {

    // eslint-disable-next-line
    const [loginApi, { data: dataLogin, isLoading }] = useUserLoginMutation({
        fixedCacheKey: "login"
    });

    return (
        <main className={b()}>
            <Routes>
                <Route path='/' element={<Introduction />} />
                <Route path='/Login' element={<Login />} />
                {<Route path='/Account' element={!isLoading && dataLogin?.login ? <Account /> : <Navigate to='/' />} />}
                {<Route path='/Polls' element={!isLoading && dataLogin?.login ? <Polls /> : <Navigate to='/' />} />}
            </Routes>

        </main>
    )
}

export default MainContent;