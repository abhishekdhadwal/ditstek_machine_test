
const EMAIL_ERROR = {
    status_code: 400,
    custom_msg: 'Sorry this email already exists',
    type: 'EMAIL_ERROR'
}

const WRONG_PASSWORD = {
    status_code: 400,
    custom_msg: 'Sorry you entered a wrong password. Please try again',
    type: 'WRONG_PASSWORD'
}

const EMAIL_NOT_FOUND = {
    status_code: 400,
    custom_msg: 'Sorry this email address is not registered with us. Please try again',
    type: 'EMAIL_NOT_FOUND'
}

const TOKEN_REQUIRED = {
    status_code: 400,
    custom_msg: 'Sorry token required to perform this action',
    type: 'TOKEN_REQUIRED'
}

export {
    EMAIL_ERROR,
    WRONG_PASSWORD,
    EMAIL_NOT_FOUND,
    TOKEN_REQUIRED
}