const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        trim: true
    },
    role: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Role'
    }
});

const UserMongo = mongoose.model('User', UserSchema);

module.exports = UserMongo;

// Find the user by Its username
module.exports.findByUserName = function (username, callback) {
    const query = {
        name: username
    }
    UserMongo.findOne(query, callback);
}
// Find the user by Its email
module.exports.findByEmail = function (email, callback) {
    const query = {
        email: email
    }
    UserMongo.findOne(query, callback);
}
// to Register the user
module.exports.addUser = function (newUser, callback) {
    bcrypt.hash(newUser.password, 10, function(err, hash) {
        if (err) throw err;
        newUser.password = hash
        newUser.save(callback);
    });
}
// Compare Password
module.exports.comparePassword = function (password, hash, callback) {
    bcrypt.compare(password, hash, function(err, res) {
        if (err) throw err;
        callback(res);
    });
}
