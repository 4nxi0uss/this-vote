import { useState } from 'react';
import type { ChangeEvent, MouseEvent } from "react"
import Modal from '../Modal/Modal';

import './Pools.scss'
import Pool from './subcomponent/Pool/Pool';
import { useAppDispatch, useAppSelector } from '../../Redux/Hooks/hooks';
import { fetchPostPolls } from '../../Redux/Slice/pollsSlice';
import { pollsData } from '../../Redux/ReduxTypes/reduxTypes';
import { optionListType } from '../../Types/Types';

let optionsList: optionListType[] = []
// let optionsList: (string | any | object) = []

const Pools = () => {
    const dispatch = useAppDispatch();

    const { infoLogin } = useAppSelector(state => state.users)

    const [isShown, setIsShown] = useState<boolean>(false)
    const [optionText, setOptionText] = useState<string>("");
    const [nameText, setNameText] = useState<string>("");
    const [questionText, setQuestionText] = useState<string>("");
    const [optionColor, setOptionColor] = useState<string>("");
    const [randomNumber, setRandomNumber] = useState<number>(0);

    const handleRandomNumber = (event?: MouseEvent<HTMLButtonElement>) => {
        event?.preventDefault()
        setRandomNumber(Math.floor(Math.random() * 1000000))
    }

    const handleModal = (event: MouseEvent<HTMLButtonElement>) => {
        setIsShown(!isShown)
        handleRandomNumber(event)
    }

    const handleNameText = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setNameText(e.target.value)
    }
    const handleQuestionText = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setQuestionText(e.target.value)
    }

    const handleClearInput = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        setOptionText("")
        setNameText("")
        setQuestionText("")
        handleRandomNumber()
        optionsList = []
    }
    const handleOptionText = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setOptionText((event.target.value).trim())
    }

    const handleOptionColor = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setOptionColor(event.target.value)
    }

    const handleAddOption = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        if (!Boolean(optionText === "") && optionsList.length < 6) {
            optionsList = [...optionsList, { name: optionText, color: optionColor }]
            setOptionText("")
        }
    }

    let text = '';

    optionsList.forEach(option => text = text + `{"name": ${option.name}, "color": ${option.color}},`)
    console.log(text)

    const poolsObject: pollsData = {
        name: nameText,
        question: questionText,
        number: randomNumber,
        option: text,
        id: infoLogin.rows[0].user_id
    }

    const handleSendPool = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        dispatch<any>(fetchPostPolls(poolsObject))
        handleClearInput(event)

    }

    const optionShow = () => optionsList.map((option: any, index: number) => <p className='optionShow' key={index}>{option?.name} <span className='optionDotColor' style={({ borderColor: `${option.color}`, backgroundColor: `${option.color}` })}></span></p>)

    // console.log('proba: ', optionShow())
    return (
        <section className='mainPoolsSection'>
            <button className='addPool' onClick={handleModal}>Add pool</button>
            <Modal isOpen={isShown} >
                <div className='modalPool'>
                    <form className='modalFormPool'>
                        <label>Name:</label>
                        <input type="text" onChange={handleNameText} value={nameText} />
                        <label>Question:</label>
                        <input type="text" onChange={handleQuestionText} value={questionText} />
                        <label className='numberLabel'>Number:</label>
                        <input className='numberInput' type="number" readOnly disabled value={randomNumber} />
                        <label>Option to choose in pool (max 6):</label>
                        <input type="text" value={optionText} onChange={handleOptionText} required />
                        <input type="color" onChange={handleOptionColor} value={optionColor} />
                        <button onClick={handleAddOption}>+</button>
                        {optionShow()}
                    </form>
                    <div>
                        <button className='btnModalClose' onClick={handleModal}>Zamknij</button>
                        <button className='btnModalClose' onClick={handleSendPool}>Wyślij</button>
                    </div>
                    {/* <button className='btnModalClose' onClick={() => handleTest(2)}>Wyślij</button> */}
                </div>
            </Modal>

            <Pool />
        </section>
    )
}

export default Pools