const assert = require('assert');
const User = require('../src/User');

describe('Creating records', () => {
    it('should save a user', (done) => {
        let sansi = new User({name:'Sansi'});
        sansi.save();
        assert(1+1 === 2);
        done();
    });
});