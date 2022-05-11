import React, { useState } from 'react';
import Modal from '../../../Modal/Modal';
import type { ChangeEvent, MouseEvent } from "react"
import { ObjectPushType, optionListType } from '../../../../Types/Types';
import { fetchPostPolls } from '../../../../Redux/Slice/postPollsSlice';
import { pollsData } from '../../../../Redux/ReduxTypes/reduxTypes';
import { useAppDispatch, useAppSelector } from '../../../../Redux/Hooks/hooks';

let optionsList: optionListType[] = []

const AddPoll = (show: any, modalFun: any, random: number) => {

    const { infoLogin } = useAppSelector(state => state.users)

    // const [isShownAdd, setIsShownAdd] = useState<boolean>(false)
    const [optionText, setOptionText] = useState<string>("");
    const [nameText, setNameText] = useState<string>("");
    const [questionText, setQuestionText] = useState<string>("");
    const [optionColor, setOptionColor] = useState<string>("#000000");
    // const [randomNumber, setRandomNumber] = useState<number>(random);

    const dispatch = useAppDispatch();

    // const handleRandomNumber = (event?: MouseEvent<HTMLButtonElement>) => {
    //     event?.preventDefault()
    //     setRandomNumber((Math.floor(Math.random() * 100000) + 100000))
    // }

    const handleNameText = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setNameText(e.target.value)
    }

    const handleQuestionText = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setQuestionText(e.target.value)
    }

    const handleOptionText = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setOptionText((event.target.value))
    }

    const handleOptionColor = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setOptionColor(event.target.value)
    }

    const handleAddOption = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        if (!Boolean(optionText === "") && optionsList.length < 6) {
            optionsList = [...optionsList, { name: optionText.trim(), color: optionColor, vote: 0 }]
            setOptionText("")
        }
    }

    // const handleModal = (event: MouseEvent<HTMLButtonElement>) => {
    //     setIsShownAdd(!isShownAdd)
    //     handleRandomNumber(event)
    // }

    let optionObject: ObjectPushType = {};
    optionsList.forEach((option, index) => optionObject[`option${index}`] = { id: index, ...option })

    const pollsObject: pollsData = {
        name: nameText,
        question: questionText,
        number: random,
        option: optionObject,
        id: infoLogin.rows[0].user_id
    }

    const handleClearInput = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        setOptionText("")
        setNameText("")
        setQuestionText("")
        // handleRandomNumber()
        optionsList = []
    }

    const handleSendPoll = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        if (Boolean(questionText) && Boolean(nameText) && Boolean(optionsList.length >= 2)) {
            dispatch<any>(fetchPostPolls(pollsObject));
            handleClearInput(event);
        }
    }

    const optionShow = () => optionsList.map((option: any, index: number) => <p className='optionShow' key={index}>{option?.name} <span className='optionDotColor' style={({ borderColor: `${option.color}`, backgroundColor: `${option.color}` })}></span></p>)



    return (
        <><Modal isOpen={show} >
            <div className='modalPoll'>
                <form className='modalFormPoll'>
                    <label>Name:</label>
                    <input type="text" onChange={handleNameText} value={nameText} />
                    <label>Question:</label>
                    <input type="text" onChange={handleQuestionText} value={questionText} />
                    <label className='numberLabel'>Number:</label>
                    <input className='numberInput' type="number" readOnly disabled value={random} />
                    <label>Option to choose in poll (max 6):</label>
                    <input type="text" value={optionText} onChange={handleOptionText} />
                    <input type="color" onChange={handleOptionColor} value={optionColor} />
                    <button onClick={handleAddOption}>+</button>
                    {optionShow()}
                </form>
                <div>
                    <button className='btnModalClose' onClick={() => { modalFun() }}>Close</button>
                    <button className='btnModalClose' onClick={handleSendPoll}>Submmit</button>
                </div>
            </div>
        </Modal></>
    )
}

export default AddPoll