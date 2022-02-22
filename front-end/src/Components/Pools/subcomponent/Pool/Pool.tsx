import * as React from 'react';

import './Pool.scss'

import { orange, red } from '../colors';

const Pool = () => {
    return (
        <section className='poolSection'>
            <h2>Name</h2>
            <h3>Question about life on mars?</h3>
            <div className='firstPart' style={({ background: `conic-gradient( ${red} 0 54%, ${orange} 54% 0)` })}></div>
            <div className='secondPart'>
                <button>yes1</button>
                <button>yes2</button>
                <button>yes3</button>
                <button>yes4</button>
                <button>yes5</button>
                <button>yes6</button>
            </div>
        </section>
    )
}

export default Pool