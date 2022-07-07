import { useState } from "react";

import type { ChangeEvent } from "react";

import style from "./EditPoll.module.scss";
import block from 'bem-css-modules';

import Modal from '../../../Modal/Modal';

import { optionListType } from "../../../../Types/Types";
import { useUpdatePollInfoMutation } from "../../../../Redux/Services/PollApi";

const b = block(style);

interface editt {
    isOpen: boolean, edit: any, pro: any
}

const EditPoll = ({ isOpen, edit, pro }: editt) => {

    const [nameText, setNameText] = useState<string>(pro?.name);
    const [questionText, setQuestionText] = useState<string>(pro?.question);
    const [random] = useState<number>(pro?.number)

    let optionsList: optionListType[] = [];

    const [updatePoll] = useUpdatePollInfoMutation()

    try {
        const optionsParse = JSON.parse(pro.options)

        const arrOptinsValue = Object.values(optionsParse)

        arrOptinsValue.forEach((el: any) => optionsList = [...optionsList, { name: el.name, color: el.color, vote: el.vote }])

    } catch (error) {
        console.warn(error)
    }

    const handleNameText = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setNameText(e.target.value)
    }

    const handleQuestionText = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setQuestionText(e.target.value)
    }

    const handleUpdatePoll = (e: any) => {
        e.preventDefault()
        updatePoll({ name: nameText.trim(), question: questionText, number: random, option: pro.options, id: pro.id })
    }

    const optionShow = () => optionsList?.map((option: any, index: number) => <div className={b('option')} key={index}>{option?.name} <span className={b('color')} style={({ borderColor: `${option.color}`, backgroundColor: `${option.color}` })}></span>
    </div>)

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
                    {optionShow()}
                </form>
                <div>
                    <button className={b('btn')} onClick={(e) => edit(e)}>Close</button>
                    <button className={b('btn')} onClick={handleUpdatePoll}>Submmit</button>
                </div>
            </div>
        </Modal>
    )
}

export default EditPoll;