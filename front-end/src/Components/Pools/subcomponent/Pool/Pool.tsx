import * as React from 'react';

import './Pool.scss'

import { orange, red } from '../colors';

const buttonOfChoose = (text = "ok") => <button>{text}</button>


const Pool = () => {
    return (
        <section className='poolSection'>
            <h2>Name</h2>
            <h3>Question about life on mars?</h3>
            <div className='firstPart' style={({ background: `conic-gradient( ${red} 0 54%, ${orange} 54% 0)` })}></div>
            <div className='secondPart'>
                {buttonOfChoose()}
            </div>
        </section>
    )
}

export default Pool