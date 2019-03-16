const mongoose = require('mongoose');
const Scheema = mongoose.Schema;

const UserSchema = new Scheema({
    name: {
        type: String,
        validate: { validator: (name) => name.length > 2, message: 'Name must be greater than 2 characters' },
        required: [true, 'Name is required']
    },
    postCount: Number
});

const User = mongoose.model('user', UserSchema);

module.exports = User;