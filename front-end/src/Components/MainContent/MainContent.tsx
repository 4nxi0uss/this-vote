import * as React from 'react';
import { Route, Switch } from 'react-router';

import './MainContent.scss';

import Introduction from './subcoponent/Introduction/Introduction';
import Login from '../Login/Login';
import Account from '../Account/Account';

const MainContent = () => {
    return (
        <main className='mainContent'>
            <Switch>
                <Route exact path='/' render={() => (<Introduction />)} />
                <Route exact path='/Login' render={() => (<Login />)} />
                <Route exact path='/Account' render={() => (<Account />)} />
            </Switch>

        </main>
    )
}

export default MainContent;