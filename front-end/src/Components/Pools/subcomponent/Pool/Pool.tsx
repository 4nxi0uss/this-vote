import * as React from 'react';

import './Pool.scss'

import { orange, red } from '../colors';

const buttonOfChoose = (text = "ok") => <button>{text}</button>


const Pool = (name: any, question: any,) => {
    return (
        <section className='poolSection'>
            <h2>{name}</h2>
            <h3>{question}</h3>
            <div className='firstPart' style={({ background: `conic-gradient( ${red} 0 54%, ${orange} 54% 0)` })}></div>
            <div className='secondPart'>
                {buttonOfChoose()}
            </div>
        </section>
    )
}

export default Pool