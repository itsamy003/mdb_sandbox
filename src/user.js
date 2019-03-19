const mongoose = require('mongoose');
const postSchema = require('./post');
const Scheema = mongoose.Schema;

const UserSchema = new Scheema({
    name: {
        type: String,
        validate: { validator: (name) => name.length > 2, message: 'Name must be greater than 2 characters' },
        required: [true, 'Name is required']
    },
    likes: Number,
    posts: [postSchema],
    blogPosts: [{
        type: Scheema.Types.ObjectId,
        ref: 'blogPost'
    }]
});

UserSchema.virtual('postCount').get(function() {
     return this.posts.length;
});

//middlewares
UserSchema.pre('remove', function(next) {
    //this --> ammi(user instance)
    const BlogPost = mongoose.model('blogPost');
    BlogPost.remove({ _id:{ $in: this.blogPosts}})
        .then(() => next());
});
const User = mongoose.model('user', UserSchema);

module.exports = User;