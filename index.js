require('dotenv').config();
var express = require('express')
var {ErrorHandle} = require('./vendor/ErrorHandler')
const fileUpload = require('express-fileupload')
var SystemHelper = require('./vendor/SystemHelper')
// define app
var app = express()

new SystemHelper(app, express)

app.use(fileUpload());

// Enable auth default module
// const AuthModule = require('./vendor/defaultAuth/AuthModule')
// new AuthModule(app)

// define routes
var web = require('./routes/web')
var api = require('./routes/api')

app.use('/', web)
app.use('/api', api)

// GET 404 & send to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})

// error handler
app.use(ErrorHandle)

// set file upload size
app.use(fileUpload({
    limits: {
        fileSize: 50 * 1024 * 1024,
    },
}));
// define http server
var port = (process.env.APP_PORT || 3000)
app.listen(port,function (){
    console.log(`Server stated on port : ${port}`)
})