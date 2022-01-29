export function validate(fields, validationSchema) {
    let errors = Object.keys(fields).reduce((acc, key) => ({...acc, [key]: ''}), {})
    let localFields = {...fields}
    Object.keys(localFields).forEach(key => localFields[key] = localFields[key].trim())
    try {
        validationSchema.validateSync(localFields, {abortEarly: false})
    } catch (err) {
        err.inner.forEach(error => {
            if (error.path) {
                errors[error.path] = error.message
            }
        })
    }
    return errors
}