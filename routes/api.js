var express = require('express')
var router = express.Router()

router.get('/',function (req, res){
    res.send('ok working api')
})

module.exports = router
