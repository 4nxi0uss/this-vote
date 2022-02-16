import ReactDOM from 'react-dom';

import './modal.scss'

import { ModalProp } from '../../Types/Types';

const Modal = ({ children, isOpen }: ModalProp) => {

    return ReactDOM.createPortal((
        <dialog className='modalBackground' open={isOpen} >
            <div className='modalContent'>
                {children}
            </div>
        </dialog>
    ), document.body
    );
};

export default Modal