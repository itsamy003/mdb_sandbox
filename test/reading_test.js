const User = require('../src/user');
const assert = require('assert');

describe('Reading users out of the database', () => {
    let sansi;

    beforeEach((done) => {
        sansi = new User({name: 'sansi'});
        sansi.save().then(() => done());
    });

    it('find all users with a name of sansi', (done) => {
        User.find({name: 'sansi'})
            .then((users) => {
                assert(users[0]._id.toString() === sansi._id.toString());
                done();
            });
    });

    it('find a user with particular id', (done) => {
        User.findOne({_id: sansi._id})
            .then((user) => {
                assert(user.name === 'sansi');
                done();
            });
    });
});