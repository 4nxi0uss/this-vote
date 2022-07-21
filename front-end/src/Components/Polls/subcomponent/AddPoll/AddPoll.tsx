import { useState } from 'react';
import type { ChangeEvent, MouseEvent } from "react";

import style from "./AddPoll.module.scss";
import block from 'bem-css-modules';

import Modal from '../../../Modal/Modal';

import { ObjectPushType, optionListType } from '../../../../Types/Types';
import { pollsData } from '../../../../Redux/ReduxTypes/reduxTypes';

import { useAddPollMutation } from '../../../../Redux/Services/PollApi';
import { useUserLoginMutation } from '../../../../Redux/Services/UserApi';

const b = block(style);

let optionsList: optionListType[] = [];

const AddPoll = (show: boolean, modalFun: any, modalRandom: any, random: number) => {

    // eslint-disable-next-line
    const [loginApi, { data: dataLogin, isLoading: isLoging }] = useUserLoginMutation({
        fixedCacheKey: "login"
    });

    const [optionText, setOptionText] = useState<string>("");
    const [nameText, setNameText] = useState<string>("");
    const [questionText, setQuestionText] = useState<string>("");
    const [optionColor, setOptionColor] = useState<string>("#000000");

    // eslint-disable-next-line
    const [addPollApi, { data: postPollData }] = useAddPollMutation();

    const handleNameText = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setNameText(e.target.value);
    };

    const handleQuestionText = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setQuestionText(e.target.value);
    };

    const handleOptionText = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setOptionText((event.target.value));
    };

    const handleOptionColor = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setOptionColor(event.target.value);
    };

    const handleAddOption = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (!Boolean(optionText === "") && optionsList.length < 6) {
            optionsList = [...optionsList, { name: optionText.trim(), color: optionColor, vote: 0 }];
            setOptionText("");
        };
    };

    let optionObject: ObjectPushType = {};
    optionsList?.forEach((option, index) => optionObject[`option${index}`] = { id: index, ...option });

    const pollsObject: pollsData = {
        name: nameText,
        question: questionText,
        number: random,
        option: optionObject,
        userId: !isLoging && dataLogin?.rows[0].user_id,
        token: !isLoging && dataLogin?.token
    }

    const handleClearInput = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setOptionText("");
        setNameText("");
        setQuestionText("");
        optionsList = [];
    };

    const handleSendPoll = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (Boolean(questionText) && Boolean(nameText) && Boolean(optionsList.length >= 2)) {
            modalRandom();
            addPollApi(pollsObject);
            handleClearInput(event);
        }
    }

    const optionShow = () => optionsList.map((option: { name: string, color: string }, index: number) => <p className={b('option')} key={index}>{index + 1}.  {option?.name} <span className={b('option__color')} style={({ borderColor: `${option.color}`, backgroundColor: `${option.color}` })}></span></p>)

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
                        <input type="number" readOnly className={b('form__number-poll')} disabled value={random} />
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

export default AddPoll;
