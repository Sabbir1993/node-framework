// const localStorage = require('localStorage')
const User = require('../models/User')

exports.userHasRole = (role) => {
      role = null;
      return async function (req, res, next) {
            await User.findById(req.session.passport.user._id).populate({
                  path: 'role',
                  select: '-_id title'
            }).then(user => {
                  if (role == user.role.title) {
                        return next()
                  } else {
                        res.render('error')
                  }

            }).catch(error => {
                  res.render('error')
            })
      }
}

exports.userHasPermission = (permission) => {
      permissions = []
      return async function (req, res, next) {
            // if (!localStorage.getItem('permissions').includes(permission)) {
            //       res.render('error')
            // } else {
            //       return next()
            // }
            await User.findById(req.session.passport.user._id).populate({
                  path: 'role',
                  populate: {
                        path: 'permissions',
                        select: '-_id title'
                  }
            }).then(user => {
                  user.role.permissions.map(permissionData => {
                        permissions.push(permissionData.title)
                  })
                  if (permissions.includes(permission)) {
                        return next()
                  } else {
                        res.render('error')
                  }
            }).catch(error => {
                  res.render('error')
            })
      }
}
