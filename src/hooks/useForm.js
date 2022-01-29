import {useState} from "react";
import {validate} from "../helpers/validate";


export function useForm(fields, validationSchema) {
    const [errors, setErrors] = useState({...fields})
    const [values, setValues] = useState({...fields})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const onChange = (event) => {
        let {name, value} = event.target
        setValues(prev => ({...prev, [name]: value}))
    }

    const onBlur = (event) => {
        let name = event.target.name
        let validation = validate(values, validationSchema)
        let successFields = Object.keys(errors)
            .filter(key => errors[key] && !validation[key])
            .reduce((acc, key) => ({...acc, [key]: ''}), {})

        setErrors(prev => ({...prev, [name]: validation[name], ...successFields}))
    }

    const onSubmit = (event) => {
        setIsSubmitting(true)
        setTimeout(() => {
            setErrors(validate(values, validationSchema))
            setIsSubmitting(false)
        }, 3000)
        event.preventDefault()
    }

    return {
        handlers: {
            onChange,
            onBlur
        },
        isSubmitting,
        onSubmit,
        errors,
        values
    }
}