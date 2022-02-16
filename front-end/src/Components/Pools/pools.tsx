import { useRef, useState } from 'react';
import Modal from '../Modal/modal';

import './pools.scss'

const Pools = () => {
    const [isShown, setIsShown] = useState<boolean>(false)
    const handleModal = () => {
        setIsShown(!isShown)
    }

    const test = useRef<any>(null)

    let options: string[] = []

    const handleAddOption = (e: any) => {
        e.preventDefault()
        // console.log(test.current?.value)

        options = [...options, test.current?.value]
        console.log(options)
    }
    console.log(options)
    const optionShow = () => {
        return options.map((index, option) => { return (<p key={index}>{option}</p>) })
    }

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
                        <input ref={test} type="text" />
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