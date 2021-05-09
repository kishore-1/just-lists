import React from 'react';
import './style.scss';

const Button = (props) => {
    return (
        <button className="o-btn" onClick={() => props.onClick && props.onClick(props.data)}>
            {props.children}
        </button>
    )
}

export default Button
