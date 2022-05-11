import { useState } from "react";

import type { ChangeEvent, MouseEvent } from "react"


import "./EditPoll.scss"
import Modal from '../../../Modal/Modal';
import { optionListType } from "../../../../Types/Types";

let optionsList: optionListType[] = []

const EditPoll = (isOpen: any) => {
    console.log(isOpen)
    // const [isShown, setIsShown] = useState<boolean>(true)
    const [optionText, setOptionText] = useState<string>("");
    const [nameText, setNameText] = useState<string>("");
    const [questionText, setQuestionText] = useState<string>("");
    const [optionColor, setOptionColor] = useState<string>("#000000");
    const [random, setRandom] = useState<number>(0)

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

    const optionShow = () => optionsList.map((option: any, index: number) => <p className='optionShow' key={index}>{option?.name} <span className='optionDotColor' style={({ borderColor: `${option.color}`, backgroundColor: `${option.color}` })}></span></p>)

    return (
        <>
            <Modal isOpen={isOpen} >
                <div className='modalEditPoll'>
                    <form className='modalFormEditPoll'>
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
                    {/* <div>
                        <button className='btnModalClose' onClick={() => { modalFun() }}>Close</button>
                        <button className='btnModalClose' onClick={handleSendPoll}>Submmit</button>
                    </div> */}
                </div>
            </Modal>
        </>
    )
}

export default EditPoll;