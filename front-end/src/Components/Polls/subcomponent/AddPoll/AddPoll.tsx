import React, { useState } from 'react';
import type { ChangeEvent, MouseEvent } from "react"
import Modal from '../../../Modal/Modal';

import style from "./AddPoll.module.scss"
import block from 'bem-css-modules'

import { ObjectPushType, optionListType } from '../../../../Types/Types';
import { pollsData } from '../../../../Redux/ReduxTypes/reduxTypes';

import { fetchPostPolls } from '../../../../Redux/Slice/postPollsSlice';
import { useAppDispatch, useAppSelector } from '../../../../Redux/Hooks/hooks';

const b = block(style)

let optionsList: optionListType[] = []

const AddPoll = (show: boolean, modalFun: any, random: number) => {

    const { infoLogin } = useAppSelector(state => state.usersLogin)

    const [optionText, setOptionText] = useState<string>("");
    const [nameText, setNameText] = useState<string>("");
    const [questionText, setQuestionText] = useState<string>("");
    const [optionColor, setOptionColor] = useState<string>("#000000");

    const dispatch = useAppDispatch();

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
        optionsList = []
    }

    const handleSendPoll = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        if (Boolean(questionText) && Boolean(nameText) && Boolean(optionsList.length >= 2)) {
            dispatch<any>(fetchPostPolls(pollsObject));
            handleClearInput(event);
        }
    }

    const optionShow = () => optionsList.map((option: any, index: number) => <p className={b('option')} key={index}>{option?.name} <span className={b('color')} style={({ borderColor: `${option.color}`, backgroundColor: `${option.color}` })}></span></p>)

    return (
        <>
            <Modal isOpen={show} >
                <div className={b()}>
                    <form className={b('form')}>
                        <label>Name:</label>
                        <input type="text" onChange={handleNameText} value={nameText} />
                        <label>Question:</label>
                        <input type="text" onChange={handleQuestionText} value={questionText} />
                        <label >Number:</label>
                        <input type="number" readOnly disabled value={random} />
                        <label>Option to choose in poll (max 6):</label>
                        <input type="text" value={optionText} onChange={handleOptionText} />
                        <input type="color" onChange={handleOptionColor} value={optionColor} />
                        <button onClick={handleAddOption}>+</button>
                        {optionShow()}
                    </form>
                    <div>
                        <button className={b('btn')} onClick={() => { modalFun() }}>Close</button>
                        <button className={b('btn')} onClick={handleSendPoll}>Submmit</button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default AddPoll
