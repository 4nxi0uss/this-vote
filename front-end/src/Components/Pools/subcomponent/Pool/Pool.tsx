import * as React from 'react';

import './Pool.scss'

import { orange, red } from '../colors';
import { PoolProp } from '../../../../Types/Types';


const Pool = ({ name, question, options = "ok" }: PoolProp) => {
    // /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{4,16}$/

    let optionOperationOnString: string = options.replaceAll("[", "{").replaceAll(",]", "}")

    let optionJsonParse: any = "test"
    try {
        optionJsonParse = JSON.parse(optionOperationOnString)
    } catch (error) {
        // console.warn(error)
    }
    console.log(optionJsonParse)

    const buttonOfChoose = () => Object.values(optionJsonParse).map((valueOfJsonData: any) => <button className='addedBtn'>{valueOfJsonData.name}</button>);

    console.log(buttonOfChoose())
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