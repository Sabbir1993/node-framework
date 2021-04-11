require('dotenv').config();
var express = require('express')
var path = require('path')
var {ErrorHandle} = require('./app/common/ErrorHandler')
var mongoose = require('mongoose')
var database = require('./config/database')
var bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
var expressLayouts = require('express-ejs-layouts')
var SystemHelper = require('./app/common/SystemHelper')
const Log = require('./app/common/Log')
const CommonHelper = require('./app/common/defaultAuth/helper')

// var hbs = require('express-handlebars')
// var handlebarsHelpers = require('handlebars-helpers')
// const CustomHbsHelpers = require('./app/common/hbsCustomHelper')
// const {setResponse} = require('./app/common/Response') # uncomment for api

// define app
var app = express()

new SystemHelper(app)

//define view engine
// app.engine('hbs', hbs({
//     extname: 'hbs',
//     defaultLayout: 'master',
//     layoutsDir: path.join(__dirname, 'resources/views/layout'),
//     partialsDir: path.join(__dirname, 'resources/views/layout'),
//     helpers: {
//         ...handlebarsHelpers(),
//         ...CustomHbsHelpers
//     }
// }))

// connect to db
mongoose.connect(database.connection,{useNewUrlParser: true, useUnifiedTopology: true})
var db = mongoose.connection
db.on('error',(err) => {Log.error(err)} )
db.once('open', function (){})

app.use(fileUpload());

// define static folder
app.use(express.static(path.join(__dirname,'public')))

// define view engine
app.set('views', path.join(__dirname,'resources/views'))
// app.set('view engine', 'hbs');
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', path.join(__dirname,'resources/views/layout/master.ejs'));

app.use(express.json());
app.use(express.urlencoded({extended: false}))

// body parser middleware for post data
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// define routes
var web = require('./routes/web')
var api = require('./routes/api')

var authRoutes = require('./app/common/defaultAuth/authRoutes')
app.use('/', authRoutes)

app.use('/', web)
app.use('/api', api)

// GET 404 & send to error handler
app.get("*", (req, res, next) => {
    // ============== for api =================
    // res.send(setResponse(null,'failed', 404, ['url not found']))
    // ============== for view ================
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
var port = (process.env.APP_PORT ?? 3000)
app.listen(port,function (){
    console.log(`Server stated on port : ${port}`)
})
