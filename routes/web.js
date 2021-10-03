var express = require('express')
var localStorage = require('local-storage');
const User = require('../app/models/User');
const bcrypt = require('bcrypt');

var router = express.Router()
router.get('/',async (req, res, next) => {
   return res.render('welcome')
})

router.get('/lang/:lang', (req, res, next) => {
   localStorage.set('lang',req.params.lang)
   return res.redirect('back')
})

module.exports = router
