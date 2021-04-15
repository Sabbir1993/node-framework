const Helper = require('../helper')
const User = require('../../app/models/User')

class LoginController {
    static login = async (req, res) => {
        return res.render('auth/login', {layout: false})
    }

    static registration = async (req, res) => {
        return res.render('auth/registration', {layout: false})
    }

    static registrationStore = async (req, res) => {
        var image = 'users/no-image.png';
        if (req.files && req.files.image) {
            image = Helper.uploadfile(req.files.image, 'users')
        }
        let newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            image: image
        });
        User.addUser(newUser, (err, user) => {
            if (err || !user) {
                req.flash('oldData', req.body)
                req.flash('error', err)
                return res.redirect('back')
            } else {
                return res.redirect('/login')
            }
        })
    }
}

module.exports = LoginController
