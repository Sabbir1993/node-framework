const Helper = require('../helper')
const User = require('../../app/models/User')

exports.login = async (req, res) => {
    return res.render('auth/login',{layout: false})
}

exports.registration = async (req, res) => {
    return res.render('auth/registration',{layout: false})
}

exports.registrationStore = async (req, res) => {
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
