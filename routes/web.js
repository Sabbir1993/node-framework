var express = require('express')
var localStorage = require('local-storage');
const User = require('../app/models/User');
const bcrypt = require('bcrypt');

var router = express.Router()
router.get('/',async (req, res, next) => {
   var password = null

   password = bcrypt.hashSync('12345678', 10);

   var user = await new User().create({
      'name': 'Dipto',
      'msisdn': '01684815187',
      'email': 'dipto@gmail.com',
      'password': password
   })
   // console.log(user);
   return res.render('welcome')
})

router.get('/lang/:lang', (req, res, next) => {
   localStorage.set('lang',req.params.lang)
   return res.redirect('back')
})

module.exports = router
