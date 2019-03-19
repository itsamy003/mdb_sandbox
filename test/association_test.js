const User = require('../src/user');
const BlogPost = require('../src/blogPost');
const Comment = require('../src/comment');
const assert = require('assert');

describe('associations', (done) => {
    let ammi, blogPost, comment;

    beforeEach((done) => {
        ammi = new User({name:'Ammi', likes: 4});
        blogPost = new BlogPost({title:'Blog 1', content:'My first blog post'});
        comment = new Comment({content:'Nice post...'});

        ammi.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = ammi;

        Promise.all([ammi.save(), blogPost.save(), comment.save()])
            .then(() => done());
    });

    it('saves a relation between user and a blogpost', (done) => {
        User.findOne({ name: 'Ammi' })
            .populate('blogPosts')
            .then((user) => {
                assert(user.blogPosts[0].title === 'Blog 1');
                done();
            })
    });

    it('saves a full relational graph', (done) => {
        User.findOne({name: 'Ammi'})
            .populate({
                path: 'blogPosts',
                populate: {
                    path: 'comments',
                    model: 'comment',
                    populate: {
                        path: 'user',
                        model: 'user'
                    }
                }
            })
            .then((user) => {
                assert(user.name == 'Ammi');
                assert(user.blogPosts[0].title == 'Blog 1');
                assert(user.blogPosts[0].comments[0].content == 'Nice post...');
                assert(user.blogPosts[0].comments[0].user.name == 'Ammi');
                // console.log(user.blogPosts[0].comments);
                done();
            });
    });
});

