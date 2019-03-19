const User = require('../src/user');
const assert = require('assert');

describe('subdocuments', () => {
    it('can create a subdocument', (done) => {
        const joy = new User({name: 'joy', posts:[{'title': 'First title'}]});
        joy.save()
            .then(() => User.findOne({name:'joy'}))
            .then((user) => {
                assert(user.posts[0].title === 'First title');
                done();
            })
    });

    it('can add a sudocument to an existing record', (done) => {
        const alex = new User({ name: 'alex', posts: [] });
        alex.save()
            .then(() => User.findOne({ name: 'alex' }))
            .then((user) => {
                user.posts.push({ title: 'Newpost' });
                return user.save();
            })
            .then(() => {
                User.findOne({ name: 'alex' })
                    .then((user) => {
                        assert(user.posts[0].title === 'Newpost');
                        done();
                    })
            });
    });

    it('can remove an existing subdocument',(done) => {
        const ammi = new User({ name: 'ammi', posts: [{title: 'New title'}]});
            ammi.save()
                .then(() => User.findOne({name: 'ammi'}))
                .then((user) => {
                    const post = user.posts[0];
                    post.remove();
                    return user.save();
                })
                .then(() => User.findOne({name: 'ammi'}))
                .then((users) => {
                    assert(users.posts.length === 0);
                    done();
                })
    });
});