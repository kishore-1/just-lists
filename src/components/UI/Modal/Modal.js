import React from 'react';
import './style.scss';

const Modal = (props) => {
    return (
        <div className="modal modal--overlay" onClick={() => props.showModal(false)}>
            <div className="modal__content" onClick={(e) => e.stopPropagation()}>
                <i
                    className="fa fa-times modal__delete"
                    onClick={() => props.showModal(false)}
                ></i>
                {props.children}
            </div>
        </div >
    )
}

export default Modal;
