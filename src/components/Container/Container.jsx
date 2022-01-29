import React from 'react';
import component from "./Container.module.scss"

const Container = ({children}) => {
    return (
        <div className={component.container}>
            {children}
        </div>
    );
};

export default Container;