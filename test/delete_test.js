const User = require('../src/user');
const assert = require('assert');

describe('deleting users out of the database', () => {
    let sansi;
    beforeEach((done) => {
        sansi = new User({name: 'sansi'})
        sansi.save()
            .then(() => done())
    });

    it('model instance remove', (done) => {
        sansi.remove()
            .then(() => User.findOne({name:'sansi'}))
            .then(user => {
                assert(user === null);
                done();
            })
    });

    it.only('class method remove', (done) => {
        User.remove({name: 'sansi'})
            .then(() => User.findOne({name:'sansi'}))
            .then(user => {
                assert(user === null);
                done();
            })
    });
});