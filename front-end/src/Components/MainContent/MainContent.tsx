import { Route, Routes } from 'react-router';

import style from './MainContent.module.scss';
import block from 'bem-css-modules'

import Introduction from './subcoponent/Introduction/Introduction';
import Login from '../Login/Login';
import Account from '../Account/Account';

import PollsList from '../Polls/PollsList';
import NotFound from '../NotFound/NotFount';
import PrivateRoutes from './subcoponent/PrivateRoute/PrivateRoute';

const b = block(style)

const MainContent = () => {

    return (
        <main className={b()}>
            <Routes>
                <Route path='/' element={<Introduction />} />
                <Route path='/login' element={<Login />} />
                <Route element={<PrivateRoutes />}>
                    <Route path='/account' element={<Account />} />
                    <Route path='/polls' element={<PollsList />} />
                </Route>
                <Route path='*' element={<NotFound />} />
            </Routes>
        </main>
    )
}

export default MainContent;