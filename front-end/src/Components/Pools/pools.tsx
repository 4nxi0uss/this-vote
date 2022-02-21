import { useRef, useState } from 'react';
import Modal from '../Modal/modal';

import './pools.scss'

let options: string[] = []

const Pools = () => {

    const [isShown, setIsShown] = useState<boolean>(false)
    const [optionText, setOptionText] = useState<string>("");

    const handleModal = () => {
        setIsShown(!isShown)
    }

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

        options = [...options, optionText]
        console.log(options)
        handleClearInput(event)

    }

    const optionShow = () => options.map((option, index) => <p key={index}>{option}</p>)

    console.log('proba: ', optionShow())

    return (
        <>
            <button className='addPool' onClick={handleModal}>Add pool</button>
            <Modal isOpen={isShown} >
                <div className='modalPool'>
                    <form className='modalFormPool'>
                        <label>Name:</label>
                        <input type="text" />
                        <label className='numberLabel'>Numer:</label>
                        <input className='numberInput' type="number" />
                        <label>Option to choose in pool:</label>
                        <input ref={test} type="text" value={optionText} onChange={handleOptionText} />
                        <button onClick={handleAddOption}>+</button>
                        {optionShow()}
                    </form>
                    <button className='btnModalClose' onClick={handleModal}>Zamknij</button>
                </div>
            </Modal>
            <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed dolorum, veritatis dolores ratione nam unde consequuntur nostrum delectus possimus quaerat id vero corporis blanditiis dolorem commodi modi deserunt aperiam! Explicabo.</h1>
        </>
    )
}

export default Pools