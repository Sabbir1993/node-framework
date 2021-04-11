exports.notAllowedHandler = (req, res, next) => {
    const methods = Object.keys(req.route.methods)
        .filter((value) => value !== '_all')
        .map((value) => value.toUpperCase())
        , err = new Error('Method Not Allowed')
    err.status = 405
    res.set('Allow', methods.join(', '))
    return next(err)
}
