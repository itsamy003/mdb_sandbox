const User = require('../src/user');
const assert = require('assert');

describe('virtual types', () => {
    it('postCount returns number of posts', (done) => {
        const ammi = new User({name: 'Ammi', posts: [{title: 'New title'}]});
        ammi.save()
            .then(() => User.findOne({name:'Ammi'}))
            .then((user) => {
                assert(ammi.postCount === 1);
                done();
            })
    });
});