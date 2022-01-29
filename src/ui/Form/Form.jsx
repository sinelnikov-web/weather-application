import React from 'react';

const Form = ({onSubmit, children, ...props}) => {

    const handleSubmit = (event) => {
        event.preventDefault()
        onSubmit(event)
    }

    return (
        <form onSubmit={handleSubmit} {...props}>
            {children}
        </form>
    );
};

export default Form;