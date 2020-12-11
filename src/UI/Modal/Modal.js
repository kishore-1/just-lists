import React from 'react';
import { modal, modalOverlay } from './Modal.module.scss';

const Modal = (props) => {
    return (
        <>
            <div className={`${modal} ${props.className || ""}`}>
                {props.children}
            </div>
            <div className={modalOverlay}></div>
        </>
    )
}

export default Modal
