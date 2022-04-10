import './Pool.scss'

import { orange, red } from '../colors';
import { PoolProp } from '../../../../Types/Types';

import { useAppDispatch, useAppSelector } from '../../../../Redux/Hooks/hooks';
import { fetchPutPolls } from '../../../../Redux/Slice/voteSlice';
import { fetchGetPolls } from '../../../../Redux/Slice/getPoolSlice';
import { useState } from 'react';

const Pool = ({ id, name, question, options }: PoolProp) => {
    const [vo, setVo] = useState(JSON.parse(options))

    const dispatch = useAppDispatch()
    const { infoLogin } = useAppSelector(state => state.users)

    let optionJsonParse: any = "test"
    optionJsonParse = JSON.parse(options)
    console.log(optionJsonParse)

    const handleRefresh = () => {
        dispatch<any>(fetchGetPolls(infoLogin.rows[0].user_id));
    }

    const handleBtnFunction = (event: any, vote?: any, index?: number) => {
        handleRefresh()
        event.preventDefault();
        setVo(vo[`option0`].vote = ++vote.vote)
        const putOption = { id: Number(id), options: vo }
        dispatch<any>(fetchPutPolls(putOption));
        setVo(JSON.parse(options))
        console.log(vo, index)
    }

    const buttonOfChoose = () => Object.values(optionJsonParse).map((valueOfJsonData: any, index: number) => !Boolean(typeof (valueOfJsonData.name) === String(undefined)) ? <button key={valueOfJsonData.name + `1`} className='addedBtn' onClick={(event: any) => handleBtnFunction(event, valueOfJsonData, index)}>{valueOfJsonData.name}--{valueOfJsonData.vote}</button> : null);

    // UPDATE `polls` SET `options` = '[\"option0\":{\"name\": \"123\", \"color\": \"#832525\", \"vote\": 2},\"option1\":{\"name\": \"sad\", \"color\": \"#ff0000\", \"vote\": 0},]' WHERE `polls`.`id` = 1;

    return (
        <section className='poolSection'>
            <h2>{name}</h2>
            <h3>{question}</h3>
            <div className='firstPart' style={({ background: `conic-gradient( ${red} 0 54%, ${orange} 54% 0)` })}></div>
            <div className='secondPart'>
                {buttonOfChoose()}
            </div>
            <p>{id}</p>
        </section>
    )
}

export default Pool