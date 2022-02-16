import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';

import './MainContent.scss';

import Introduction from './subcoponent/Introduction/Introduction';
import Login from '../Login/Login';
import Account from '../Account/Account';
import { useAppSelector } from '../../Redux/Hooks/hooks';
import Pools from '../Pools/pools';

const MainContent = () => {

    const { infoLogin } = useAppSelector(state => state.users)

    return (
        <main className='mainContent'>
            <Switch>
                <Route exact path='/' render={() => (<Introduction />)} />
                <Route exact path='/Login' render={() => (<Login />)} />
                {infoLogin.login ? <Route exact path='/Account' render={() => (<Account />)} /> : <Redirect to='/' />}
                {infoLogin.login ? <Route exact path='/Pools' render={() => (<Pools />)} /> : <Redirect to='/' />}
            </Switch>

        </main>
    )
}

export default MainContent;