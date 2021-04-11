const User = require('../models/User')
const {catchErrorAndReturn} = require('../common/defaultAuth/helper')
const { check } = require('express-validator')

module.exports = [
    check('name').notEmpty().withMessage('Name field is required'),
    check('password').isLength({min:8}).withMessage('Password minimum length 8'),
    check('password').custom((value, { req }) => {
        if (value !== req.body.confirm_password) {
            return Promise.reject('Password confirmation is incorrect');
        } else {
            return true;
        }
    }),
    check('email').isEmail().withMessage('Email field is required'),
    check('email').custom(value => {
        return User.findOne({email:value}).then(user => {
            if (user) {
                return Promise.reject('E-mail already in use');
            }
        });
    }),
    catchErrorAndReturn
]
