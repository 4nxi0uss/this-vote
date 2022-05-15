import { Route, Routes } from 'react-router';
import { Navigate } from 'react-router-dom';

import './MainContent.scss';

import Introduction from './subcoponent/Introduction/Introduction';
import Login from '../Login/Login';
import Account from '../Account/Account';
import { useAppSelector } from '../../Redux/Hooks/hooks';
import Polls from '../Polls/Polls';

const MainContent = () => {

    const { infoLogin } = useAppSelector(state => state.usersLogin)

    return (
        <main className='mainContent'>
            <Routes>
                <Route path='/' element={<Introduction />} />
                <Route path='/Login' element={<Login />} />
                {<Route path='/Account' element={infoLogin.login ? <Account /> : <Navigate to='/' />} />}
                {<Route path='/Polls' element={infoLogin.login ? <Polls /> : <Navigate to='/' />} />}
            </Routes>

        </main>
    )
}

export default MainContent;