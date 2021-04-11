var express = require('express')
var router = express.Router()
const passport = require('passport')
const {userHasPermission,userHasRole} = require('../../middleware/CheckRolePermission')
const {Guest} = require('../../middleware/Guest')
const {Auth} = require('../../middleware/Authenticate')
var LoginController = require('./LoginController')
var RegistrationRequest = require('../../requests/RegistrationRequest')
var LoginRequest = require('../../requests/LoginRequest')

router.post('/login', Guest, LoginRequest, passport.authenticate('local',{
    successRedirect : '/',
    failureRedirect : '/login',
    failureFlash : true
}))
router.get('/login', Guest, LoginController.login)
router.get('/registration', Guest, LoginController.registration)
router.post('/registration',RegistrationRequest,LoginController.registrationStore)

router.get('/logout', Auth,(req, res) => {
    req.logOut();
    req.flash('success', 'You are logged out!!!');
    res.redirect('login');
});

module.exports = router
