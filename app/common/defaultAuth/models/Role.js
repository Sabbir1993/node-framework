const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true)

const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
        unique: true
    },
    description: {
        type: String,
        trim: true
    },
    permissions:[{
        type: mongoose.Schema.Types.Mixed,
        ref: 'Permission'
    }],
    date: {
        type: Date,
        default: Date.now
    }
});

RoleSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next('There was a duplicate key error')
    } else {
        next()
    }
});

RoleSchema.post('update', function (error, res, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next("There was a duplicate key error")
    } else {
        next() // The `update()` call will still error out.
    }
});

// RoleSchema.virtual('permissionData', {
//     ref: 'Permission',
//     localField: 'permissions',
//     foreignField: '_id',
//     justOne: false,
//     count:false
// });
const Role = mongoose.model('Role', RoleSchema);

module.exports = Role;
