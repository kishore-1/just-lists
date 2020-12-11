import React from 'react';
import { btn } from './Button.module.scss';

const Button = (props) => {
    return (
        <>
            <button className={`${btn} ${props.className || ''}`} onClick={() => props.onClick && props.onClick(props.data)}>
                {props.children}
            </button>
        </>
    )
}

export default Button
