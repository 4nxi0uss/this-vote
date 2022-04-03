import './Pool.scss'

import { orange, red } from '../colors';
import { PoolProp } from '../../../../Types/Types';
import { useAppDispatch } from '../../../../Redux/Hooks/hooks';
import { fetchPutPolls } from '../../../../Redux/Slice/voteSlice';

const Pool = ({ id, name, question, options = "ok" }: PoolProp) => {


    const dispatch = useAppDispatch()
    let optionOperationOnString: string = options.replaceAll("[", "{").replaceAll(",]", "}")

    let optionJsonParse: any = "test"
    try {
        optionJsonParse = JSON.parse(optionOperationOnString)
    } catch (error) {
        // console.warn(error)
    }
    console.log(id, optionOperationOnString)
    const putOption = { id: Number(id), options: 'nie' }

    const handleBtnFunction = (e: any) => {
        e.preventDefault()
        dispatch<any>(fetchPutPolls(putOption))
    }

    const buttonOfChoose = () => Object.values(optionJsonParse).map((valueOfJsonData: any) => !Boolean(typeof (valueOfJsonData.name) === String(undefined)) ? <button key={valueOfJsonData.name + `1`} className='addedBtn' onClick={handleBtnFunction}>{valueOfJsonData.name}</button> : null);
    Object.values(optionJsonParse).forEach((valueOfJsonData: any) => console.log(valueOfJsonData.name, valueOfJsonData.color, valueOfJsonData.vote));

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