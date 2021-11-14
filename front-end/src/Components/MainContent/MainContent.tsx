import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';

import './MainContent.scss';

import Introduction from './subcoponent/Introduction/Introduction';
import Login from '../Login/Login';
import Account from '../Account/Account';
import { useAppSelector } from '../../Redux/Hooks/hooks';

const MainContent = () => {

    const { info } = useAppSelector(state => state.users)

    return (
        <main className='mainContent'>
            <Switch>
                <Route exact path='/' render={() => (<Introduction />)} />
                <Route exact path='/Login' render={() => (<Login />)} />
                {info.login ? <Route exact path='/Account' render={() => (<Account />)} /> : <Redirect to='/' />}
            </Switch>

        </main>
    )
}

export default MainContent;