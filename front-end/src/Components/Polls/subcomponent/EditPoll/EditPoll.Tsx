import { useState } from "react";

import "./EditPoll.scss"
import Modal from '../../../Modal/Modal';


const EditPoll = () => {

    const [isShown, setIsShown] = useState<boolean>(true)

    return (
        <>
            <Modal isOpen={isShown} >
                <div>ok</div>
            </Modal>
        </>
    )
}

export default EditPoll;