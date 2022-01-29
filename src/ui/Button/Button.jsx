import React from 'react';
import component from "./Button.module.scss"

const Button = ({text, padding, onClick, cls, type}) => {
    return (
        <button
            className={`${component.button} ${cls}`}
            type={type}
            onClick={onClick}
            style={{
                padding: padding.map(value => `${value}px`).join(' ')
            }}
        >
            {text}
        </button>
    );
};

export default Button;