import React from 'react';
import './style.scss'

function DropdownMenu(props) {
    return (
        <div>
            <div className="overlay" onClick={(e) => {
                console.log('hi')
                e.stopPropagation()
                props.hideDropdown()
            }}></div>
            <div className="menu">
                {
                    props.options.map((option) =>
                        <li
                            className="menu__option"
                            key={option.menu}
                            onClick={
                                (e) => {
                                    e.stopPropagation();
                                    option.action();
                                }
                            }
                        >
                            {option.menu}
                        </li>
                    )
                }
            </div>
        </div>
    )
}

export default DropdownMenu;
