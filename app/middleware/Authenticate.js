exports.Auth = (req, res, next) => {
    if(req.isAuthenticated()){
        return next()
    }
    req.flash('error','Please login to view resourse!!!!!');
    res.redirect('/login')
}
