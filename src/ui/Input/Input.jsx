import React, {Fragment, useState} from 'react';
import component from "./Input.module.scss"
import Icon from "../Icon";


const Input = ({placeholder, type, onChange, padding, icon, cls, name, error, value, ...props}) => {

    const [showPassword, setShowPassword] = useState(false)

    const handleShowPassword = () => {
        setShowPassword(prev => !prev)
    }

    return (
        <Fragment>
            <div className={component.input__wrapper}>
                <div className={component.input__field}>
                    {icon && <div className={component.input__icon}>
                        <Icon name={icon}/>
                    </div>}
                    <input
                        className={`${component.input__input} ${cls ? cls : ''} ${error ? component.error : ''}`}
                        placeholder={placeholder}
                        type={type === 'password' && showPassword ? 'text' : type}
                        onChange={onChange}
                        name={name}
                        value={value}
                        style={{
                            padding: padding.map(value => `${value}px`).join(' ')
                        }}
                        {...props}
                    />
                    {type === 'password' &&
                    <div className={component['input__show-password']} onClick={handleShowPassword}>
                        <Icon name={'eye'}/>
                    </div>}
                </div>
                {error && <p className={component.input__error}>{error}</p>}
            </div>
        </Fragment>
    );
};

export default Input;