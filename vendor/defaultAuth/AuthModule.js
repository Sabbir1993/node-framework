const passport = require('passport')
const session = require('express-session')
const Helper = require('../helper')
require('../../config/passport')(passport);

module.exports = class AuthModule {
    constructor(app) {
        this.init(app)
    }

    init(app){
        // define passport
        app.use(passport.initialize())
        app.use(passport.session())

        app.use(async function (req, res, next) {
            // res.locals.role = await Helper.role(req.session.passport)
            // res.locals.permission = await Helper.permission(req.session.passport)
            res.locals.auth = req.session?.passport ? req.session?.passport?.user : null
            next();
        });

        var authRoutes = require('./authRoutes')
        app.use('/', authRoutes)
    }

}
