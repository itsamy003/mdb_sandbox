const  User = require('../src/user');
const  assert = require('assert');

describe('updating records', () => {
    let sansi;

    beforeEach((done) => {
        sansi = new User({name:'sansi'});
        sansi.save()
            .then(() => done());
    });

    it.only('instance type using set and save', (done) => {
        sansi.set('name', 'Sansika Reddy');
        sansi.save()
            .then(() => User.find({}))
            .then((users) => {
                assert(users.length === 1);
                assert(users[0].name === "Sansika Reddy");
                done();
            });
    })
});