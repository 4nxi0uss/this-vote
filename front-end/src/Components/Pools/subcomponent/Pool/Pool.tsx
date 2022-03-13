import * as React from 'react';

import './Pool.scss'

import { orange, red } from '../colors';
import { PoolProp } from '../../../../Types/Types';



const Pool = ({ name, question, options }: PoolProp) => {
    // /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{4,16}$/

    let optionOperationOnString = options.replaceAll("[", "{").replaceAll(",]", "}").replaceAll("{{", "{").replaceAll("},{", " , ").replaceAll("}}", "}")
    let optionJsonParse = JSON.parse(optionOperationOnString)

    const buttonOfChoose = (text = "ok") => <button>{text}</button>

    // console.log(JSON.parse(test))
    console.log(optionJsonParse)

    return (
        <section className='poolSection'>
            <h2>{name}</h2>
            <h3>{question}</h3>
            <div className='firstPart' style={({ background: `conic-gradient( ${red} 0 54%, ${orange} 54% 0)` })}></div>
            <div className='secondPart'>
                {buttonOfChoose()}
            </div>
            <p>{options}</p>
        </section>
    )
}

export default Pool