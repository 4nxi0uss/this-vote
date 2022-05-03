import './Pool.scss'

import { orange, red } from '../colors';
import { PoolProp } from '../../../../Types/Types';

import { useAppDispatch, useAppSelector } from '../../../../Redux/Hooks/hooks';
import { fetchPutPolls } from '../../../../Redux/Slice/voteSlice';
import { fetchGetPolls } from '../../../../Redux/Slice/getPoolSlice';

const Pool = ({ id, name, question, options }: PoolProp) => {

    const dispatch = useAppDispatch()
    const { infoLogin } = useAppSelector(state => state.users)
    const { infoPutPoll } = useAppSelector(state => state.putPull)

    console.warn(infoPutPoll.error)
    let optionJsonParse: object = JSON.parse(options)

    const handleRefresh = () => {
        dispatch<any>(fetchGetPolls(infoLogin.rows[0].user_id));
    }

    const handleBtnFunction = (event: any, vote?: any, index?: number) => {
        event.preventDefault();

        const putOption = { id: Number(id), optionId: vote.id }

        dispatch<any>(fetchPutPolls(putOption));
        handleRefresh()
    }

    const buttonOfChoose = () => Object.values(optionJsonParse).map((valueOfJsonData: any, index: number) => !Boolean(typeof (valueOfJsonData.name) === String(undefined)) ? <button key={valueOfJsonData.id} className='addedBtn' onClick={(event: any) => handleBtnFunction(event, valueOfJsonData, index)}>{valueOfJsonData.name}--{valueOfJsonData.vote}</button> : null);

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