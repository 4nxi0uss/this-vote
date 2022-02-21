import { useRef, useState } from 'react';
import Modal from '../Modal/Modal';

import './Pools.scss'
import Pool from './subcomponent/Pool/Pool';

let optionsList: string[] = []

const Pools = () => {

    const [isShown, setIsShown] = useState<boolean>(false)
    const [optionText, setOptionText] = useState<string>("");
    const [randomNumber, setRandomNumber] = useState<number>(0);

    const handleRandomNumber = (e?: any) => {
        e.preventDefault()
        setRandomNumber(Math.floor(Math.random() * 1000000))
    }

    const handleModal = (e: any) => {
        setIsShown(!isShown)
        handleRandomNumber(e)
    }

    // console.log("1", randomNumber())
    const test = useRef<any>(null)

    const handleClearInput = (e: any) => {
        e.preventDefault()
        setOptionText("")
    }
    const handleOptionText = (event: any) => {
        event.preventDefault()
        setOptionText(event.target.value)
    }


    const handleAddOption = (event: any) => {
        event.preventDefault()

        optionsList = [...optionsList, optionText]
        console.log(optionsList)
        handleClearInput(event)

    }

    const optionShow = () => optionsList.map((option, index) => <p key={index}>{option}</p>)

    console.log('proba: ', optionShow())

    return (
        <section className='mainPoolsSection'>
            <button className='addPool' onClick={handleModal}>Add pool</button>
            <Modal isOpen={isShown} >
                <div className='modalPool'>
                    <form className='modalFormPool'>
                        <label>Name:</label>
                        <input type="text" />
                        <label>Question:</label>
                        <input type="text" />
                        <label className='numberLabel'>Number:</label>
                        <input className='numberInput' type="number" readOnly disabled value={randomNumber} />
                        <label>Option to choose in pool:</label>
                        <input ref={test} type="text" value={optionText} onChange={handleOptionText} />
                        <button onClick={handleAddOption}>+</button>
                        {optionShow()}
                    </form>
                    <button className='btnModalClose' onClick={handleModal}>Zamknij</button>
                    <button className='btnModalClose' onClick={handleModal}>Wyślij</button>
                </div>
            </Modal>

            <Pool />
        </section>
    )
}

export default Pools