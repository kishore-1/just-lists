import React from 'react';
import './style.scss';

function Toast(props) {
    setTimeout(props.hideToast, 2900, { show: false, message: "" });
    console.log(props.type)
    return (
        <div className={"toast toast--" + (props.type || "error")}>
            {props.children}
        </div>
    )
}

export default Toast;
