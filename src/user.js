const mongoose = require('mongoose');
const postSchema = require('./post');
const Scheema = mongoose.Schema;

const UserSchema = new Scheema({
    name: {
        type: String,
        validate: { validator: (name) => name.length > 2, message: 'Name must be greater than 2 characters' },
        required: [true, 'Name is required']
    },
    postCount: Number,
    posts: [postSchema]
});

const User = mongoose.model('user', UserSchema);

module.exports = User;