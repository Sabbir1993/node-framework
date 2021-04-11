exports.Guest = (req, res, next) => {
    if(!req.isAuthenticated()){
        return next()
    }
    req.flash('error','You already logged in !!! ');
    res.redirect('/')
}
