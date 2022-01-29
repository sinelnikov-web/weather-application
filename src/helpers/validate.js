

export function validate(fields, validationSchema) {
    let errors = Object.keys(fields).reduce((acc, key) => ({...acc, [key]: ''}), {})
    try {
        validationSchema.validateSync(fields, {abortEarly: false})
    } catch (err) {
        err.inner.forEach(error => {
            if (error.path) {
                errors[error.path] = error.message
            }
        })
    }
    return errors
}