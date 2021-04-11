const User = require('../../models/User')
const { validationResult } = require('express-validator')
const Log = require('../Log')
const { v4: uuidv4 } = require('uuid');

exports.uploadfile = (file, path = null) => {
    let sampleFile = file;
    let name = uuidv4()+Date.now()+file.name;
    sampleFile.mv((path ? `public/uploads/${path}/${name}` : `public/uploads/${name}`) , function (err) {
        if (err) {
            Log.error(err)
            throw err
        }
    });
    return (path ? `/${path}/${name}` : `/${name}`);
}

exports.role = async (val) => {
    roles = null
    if (val && val.user) {
        await User.findById(val.user._id).populate({
            path: 'role',
            select: '-_id name'
        }).then(user => {
            roles = user.role.name
        })
    }
    return roles
}

exports.permission = async (val) => {
    permissions = []
    if (val && val.user) {
        await User.findById(val.user._id).populate({
            path: 'role',
            populate: {
                path: 'permissions',
                select: '-_id name'
            }
        }).then(user => {
            if (user.role.permissions.length > 0) {
                user.role.permissions.map(permission => {
                    permissions.push(permission.name)
                })
            }
        })
    }
    return permissions;
}

exports.catchErrorAndReturn = (req, res, next) => {
    const errors = validationResult(req)
    const oldData = req.body
    if (!errors.isEmpty()) {
        req.flash('errors',errors.array())
        req.flash('oldData',oldData)
        return res.redirect('back');
    } else {
        next()
    }
}
