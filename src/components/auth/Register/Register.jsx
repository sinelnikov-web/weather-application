import React, {useState} from 'react';
import component from "../Auth.module.scss"
import Button from "../../../ui/Button";
import Input from "../../../ui/Input";
import Container from "../../Container/Container";
import Form from "../../../ui/Form";
import Loader from "../../../ui/Loader";
import {useForm} from "../../../hooks/useForm";
import {registrationSchema} from "../../../validation/shemas";
import {createUser} from "../../database/database";

const Register = ({setView}) => {

    const fieldsArray = [
        {
            id: 0,
            name: 'firstName',
            type: 'text',
            icon: 'user',
            placeholder: 'Enter your first name'
        },
        {
            id: 1,
            name: 'lastName',
            type: 'text',
            icon: 'user',
            placeholder: 'Enter your last name'
        },
        {
            id: 2,
            name: 'email',
            type: 'email',
            icon: 'email',
            placeholder: 'example@mail.com'
        },
        {
            id: 3,
            name: 'password',
            type: 'password',
            icon: 'lock',
            placeholder: "Enter password"
        },
        {
            id: 4,
            name: 'rePassword',
            type: 'password',
            icon: 'lock',
            placeholder: "Repeat password"
        },
    ]

    const {
        onSubmit,
        errors,
        isSubmitting,
        handlers,
        values,
        setErrors,
        setIsSubmitting
    } = useForm({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        rePassword: ''
    }, registrationSchema)

    const handleChangeView = (event, view) => {
        event.preventDefault()
        setView(view)
    }

    const handleSubmit = (event) => {
        onSubmit(event)
        createUser(values).then(res => {
            window.location.reload()
        }).catch(err => {
            setTimeout(() => {
                setIsSubmitting(false)
                setErrors(prev => ({...prev, email: err.message}))
            }, 3000)
        })
    }

    return (
        <Container>
            {isSubmitting && <Loader/>}
            <div className={component.auth}>
                <h1 className={component.auth__title}>Sign Up</h1>
                <Form onSubmit={handleSubmit} className={component.auth__form}>
                    {fieldsArray.map(field => {
                        return (
                            <Input
                                key={field.id}
                                type={field.type}
                                icon={field.icon}
                                name={field.name}
                                value={values[field.name]}
                                placeholder={field.placeholder}
                                padding={[15, 15, 15, 30]}
                                error={errors[field.name]}
                                {...handlers}
                            />
                        )
                    })}
                    <Button
                        text={'Register'}
                        type={'submit'}
                        onClick={() => {
                        }}
                        padding={[15, 15, 15, 15]}
                    />
                </Form>
                <p>Already have an account? <a onClick={(e) => handleChangeView(e, 'login')}>Login</a></p>
            </div>
        </Container>
    );
};

export default Register;