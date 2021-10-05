const localStorage = require('local-storage');
const path = require('path')
const session = require('express-session')
const mongoose = require('mongoose')
const mysql = require('mysql');
const database = require('../config/database')
const expressLayouts = require('express-ejs-layouts')
var bodyParser = require('body-parser')
const Log = require('./Log');

module.exports = class SystemHelper {
    constructor(app, express) {
        this.connectToDB()
        this.enableViewEngine(app, express)
        this.enableBodyParser(app, express)
        this.translateHelpers(app)
        this.handleRequestData(app)

    }
    connectToDB(){
        // connect to db
        try{
            if(process.env.DB_DRIVER.toLowerCase() === 'mongo'){
                mongoose.connect(database.mongo,{useNewUrlParser: true, useUnifiedTopology: true})
                var db = mongoose.connection
                db.on('error',(err) => {Log.error(err)} )
                db.once('open', function (){})
            } else if (process.env.DB_DRIVER.toLowerCase() === 'mysql'){
                global.mysql = mysql.createConnection(database.mysql);
            } else {
                Log.error('Invalid DB Driver')
                throw 'Invalid DB Driver'
            }
        }catch(error){
            Log.error(error.toString())
            global.next(error)
        }
    }

    enableViewEngine(app, express) {
        // define static folder
        app.use(express.static(path.join(__dirname, '../public')))
        // define view engine
        app.set('views', path.join(__dirname, '../resources/views'))
        // app.set('view engine', 'hbs');
        app.set('view engine', 'ejs');
        app.use(expressLayouts);
        app.set('layout', path.join(__dirname, '../resources/views/layout/master.ejs'));
    }

    enableBodyParser(app, express) {
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }))

        // body parser middleware for post data
        app.use(bodyParser.urlencoded({ extended: false }))
        app.use(bodyParser.json())
    }

    translateHelpers = (app) => {
        app.locals.trans = (val) => {
            var lang = localStorage.get('lang') ? localStorage.get('lang') : 'en'
            var tempFile = val.split('.')
            var tempOutput = val
            var transFile = require(path.join(__dirname, `../resources/lang/${lang}/${tempFile[0]}`))
            var tempIndex = transFile
            tempFile.forEach((element, key) => {
                if (key > 0) {
                    tempIndex = tempIndex[element]
                }
            })

            return tempIndex ?? tempOutput
        }
        app.locals.numberToBn = (input) => {
            var englishToBanglaNumber = { '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪', '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯' };
            for (var x in englishToBanglaNumber) {
                input = input.toString().replace(new RegExp(x, 'g'), englishToBanglaNumber[x]);
            }
            return input;
        }
    }

    handleRequestData = (app) => {
        app.locals.auth = null

        // define session
        app.use(session({
            secret: process.env.SESSION_SECRET || 'keyboard cat',
            resave: false,
            saveUninitialized: true,
            cookie: { httpOnly: true, maxAge: 2419200000 }
        }))

        app.use(require('connect-flash')());

        app.use(async function (req, res, next) {
            global.next = next
            global.req = req
            global.res = res
            var oldReqData = req.flash('oldData');
            var successMessage = req.flash('success');
            var errorMessage = req.flash('error');
            res.locals.success = successMessage.length > 0 ? successMessage[0] : null
            res.locals.error = errorMessage.length > 0 ? errorMessage[0] : null
            res.locals.errors = req.flash('errors')
            res.locals.oldData = oldReqData.length > 0 ? oldReqData[0] : {};
            next();
        });
    }
}
