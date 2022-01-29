import { object, string, ref } from 'yup';

export const registrationSchema = object({
    firstName: string().required('First Name is required'),
    lastName: string().required('Last Name is required'),
    email: string().email().required('Email is required'),
    password: string().min(6, "Password should be more than 5 letters").required('Password is required'),
    rePassword: string().oneOf([ref('password'), null], 'Passwords must match')
})

export const loginSchema = object({
    email: string().email().required('Email is required'),
    password: string().required('Password is required'),
})
