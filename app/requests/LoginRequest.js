const {catchErrorAndReturn} = require('../common/defaultAuth/helper')
const { check } = require('express-validator')

module.exports = [
    check('password').isLength(8).withMessage('Password minimum length 8'),
    check('email').isEmail().withMessage('Email field is invalid'),
    catchErrorAndReturn
]
