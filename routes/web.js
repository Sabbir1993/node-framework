var express = require('express')
var localStorage = require('local-storage');
var TestController = require('../app/controller/TestController')
var router = express.Router()
router.get('/',async (req, res, next) => {
   return res.render('welcome')
})

router.get('/test', TestController.index)

router.get('/lang/:lang', (req, res, next) => {
   localStorage.set('lang',req.params.lang)
   return res.redirect('back')
})

module.exports = router
