var localStorage = require('local-storage');
var path = require('path')
const passport = require('passport')
var session = require('express-session')
require('../../config/passport')(passport);

module.exports = class SystemHelper {
    constructor(app) {
        this.translateHelpers(app)
        this.handleRequestData(app)

    }
    translateHelpers = (app) => {
        app.locals.trans = (val) => {
            var lang = localStorage.get('lang') ? localStorage.get('lang') : 'en'
            var tempFile = val.split('.')
            var tempOutput = val
            var transFile = require(path.join(__dirname,`../../resources/lang/${lang}/${tempFile[0]}`))
            var tempIndex = transFile
            tempFile.forEach((element, key) => {
                if(key > 0) {
                    tempIndex = tempIndex[element]
                }
            })

            return tempIndex ?? tempOutput
        }
        app.locals.numberToBn = (input) => {
            var englishToBanglaNumber={'0':'০','1':'১','2':'২','3':'৩','4':'৪','5':'৫','6':'৬','7':'৭','8':'৮','9':'৯'};
            for (var x in englishToBanglaNumber) {
                input = input.toString().replace(new RegExp(x, 'g'), englishToBanglaNumber[x]);
            }
            return input;
        }
    }

    handleRequestData = (app) => {
        // define session
        app.use(session({
            secret: process.env.SESSION_SECRET || 'keyboard cat',
            resave: false,
            saveUninitialized: true,
            cookie: { httpOnly: true, maxAge: 2419200000 }
        }))
        // define passport
        app.use(passport.initialize())
        app.use(passport.session())

        app.use(require('connect-flash')());

        app.use(async function (req, res, next) {
            var oldReqData = req.flash('oldData');
            var successMessage = req.flash('success');
            var errorMessage = req.flash('error');

            // res.locals.role = await CommonHelper.role(req.session.passport)
            // res.locals.permission = await CommonHelper.permission(req.session.passport)
            res.locals.auth = req.session?.passport ? req.session?.passport?.user : null
            res.locals.success = successMessage.length > 0 ? successMessage[0] : null
            res.locals.error = errorMessage.length > 0 ? errorMessage[0] : null
            res.locals.errors = req.flash('errors')
            res.locals.oldData = oldReqData.length > 0 ? oldReqData[0] : {};
            next();
        });
    }
}
