import * as React from 'react';

import './MainContent.scss';

import Introduction from './subcoponent/Introduction/Introduction';

const MainContent = () => {
    return (
        <main className='mainContent'>
            <Introduction />
        </main>
    )
}

export default MainContent;