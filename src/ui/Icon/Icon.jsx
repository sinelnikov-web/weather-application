import React from 'react';
import icons from "./icons.json"
import component from "./Icon.module.scss"

const Icon = ({name, cls}) => {
    return (
        <div
            className={`${component.icon} ${cls}`}
            dangerouslySetInnerHTML={{__html: icons[name]}}
        >
        </div>
    );
};

export default Icon;