const assert = require('assert');
const User = require('../src/user');

describe('Creating records', () => {
    it('should save a user', (done) => {
        let sansi = new User({name:'Sansi'});
        sansi.save()
            .then(() => {
                assert(!sansi.isNew);
                done();
            });
    });
});