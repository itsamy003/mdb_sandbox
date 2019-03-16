const mongoose = require('mongoose');
const Scheema = mongoose.Schema;

const UserSchema = new Scheema({
    name: String,
    postCount: Number
});

const User = mongoose.model('user', UserSchema);

module.exports = User;