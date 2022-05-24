import ReactDOM from 'react-dom';

import style from './Modal.module.scss'
import block from 'bem-css-modules'

import { ModalProp } from '../../Types/Types';

const b = block(style);

const Modal = ({ children, isOpen }: ModalProp) => {

    return ReactDOM.createPortal((
        <dialog className={b()} open={isOpen} >
            <div className={b('content')}>
                {children}
            </div>
        </dialog>
    ), document.body
    );
};

export default Modal