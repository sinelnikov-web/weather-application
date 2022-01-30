import React, {useState} from 'react';
import component from "../Auth.module.scss"
import Button from "../../../ui/Button";
import Input from "../../../ui/Input";
import Container from "../../Container/Container";
import Form from "../../../ui/Form";
import Loader from "../../../ui/Loader";
import {useForm} from "../../../hooks/useForm";
import {loginSchema} from "../../../validation/shemas";
import {authenticate, createUser} from "../../database/database";


const Login = ({setView}) => {

    const fieldsArray = [
        {
            id: 0,
            name: 'email',
            type: 'email',
            placeholder: 'example@mail.com',
            icon: 'email'
        },
        {
            id: 1,
            name: 'password',
            type: 'password',
            placeholder: 'Enter password',
            icon: 'lock'
        }
    ]
    const {
        values,
        errors,
        onSubmit,
        handlers,
        isSubmitting,
        setErrors,
        setIsSubmitting
    } = useForm({
        email: '',
        password: ''
    }, loginSchema)

    const handleChangeView = (event, view) => {
        event.preventDefault()
        setView(view)
    }

    const handleSubmit = (event) => {
        onSubmit(event)
        authenticate(values).then(res => {
            localStorage.setItem('authenticatedUser', values.email)
            window.location.reload()
        }).catch(err => {
            setTimeout(() => {
                setIsSubmitting(false)
                setErrors(prev => {
                    return {
                        ...prev,
                        email: err.message,
                        password: err.message
                    }
                })
            }, 3000)
        })
    }

    return (
        <Container>
            {isSubmitting && <Loader/>}
            <div className={component.auth}>
                <h1 className={component.auth__title}>Login</h1>
                <Form className={component.auth__form} onSubmit={handleSubmit}>
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
                        text={'Login'}
                        type={'submit'}
                        onClick={() => {
                        }}
                        padding={[15, 15, 15, 15]}
                    />
                </Form>
                <p>Don't have an account? <a onClick={(e) => handleChangeView(e, 'register')}>Register Now</a></p>
            </div>
        </Container>
    );
};

export default Login;