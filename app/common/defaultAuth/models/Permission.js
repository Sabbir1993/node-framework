const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true)

const PermissionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
        unique: true
    },
    description: {
        type: String,
        trim: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

PermissionSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next('There was a duplicate key error')
    } else {
        next()
    }
});

PermissionSchema.post('update', function (error, res, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next("There was a duplicate key error")
    } else {
        next() // The `update()` call will still error out.
    }
});

const Permission = mongoose.model('Permission', PermissionSchema);

module.exports = Permission;
