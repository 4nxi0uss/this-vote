import { useState } from "react";

import type { ChangeEvent } from "react";

import style from "./EditPoll.module.scss";
import block from 'bem-css-modules';

import Modal from '../../../Modal/Modal';

import { optionListType } from "../../../../Types/Types";

const b = block(style);

let optionsList: optionListType[] = [];

interface editt {
    isOpen: boolean, edit: any, pro: any
}

const EditPoll = ({ isOpen, edit, pro }: editt) => {

    const [optionText, setOptionText] = useState<string>();
    const [nameText, setNameText] = useState<string>(pro?.name);
    const [questionText, setQuestionText] = useState<string>(pro?.question);
    const [optionColor, setOptionColor] = useState<string>("#000000");
    const [random, setRandom] = useState<number>(pro?.number)

    // console.log(pro.options)

    try {
        // const ok = JSON.parse(pro.options)
        // console.log(ok)
    } catch (error) {

    }

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


    const optionShow = () => optionsList.map((option: any, index: number) => <p className={b('option')} key={index}>{option?.name} <span className={b('color')} style={({ borderColor: `${option.color}`, backgroundColor: `${option.color}` })}></span></p>)

    return (
        <Modal isOpen={isOpen}  >
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
                    {/* <button onClick={handleAddOption}>+</button> */}
                    {optionShow()}
                </form>
                <div>
                    <button className={b('btn')} onClick={(e) => edit(e)}>Close</button>
                    {/* <button className='btnModalClose' onClick={handleSendPoll}>Submmit</button> */}
                </div>
            </div>
        </Modal>
    )
}

export default EditPoll;
