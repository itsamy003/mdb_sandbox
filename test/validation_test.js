const User = require('../src/user');
const assert = require('assert');

describe('validating records', () => {
    it('it requires a user name', (done) => {
        const sansi = new User({name: undefined});
        const validationResult = sansi.validateSync();
        const {message} = validationResult.errors.name;
        console.log(message,'--');
        assert(message === 'Name is required');
        done();
    });

    it('require a user\'s name longer than 2 charachters', (done) => {
        const sansi = new User({name: 'sa'});
        const validationResult = sansi.validateSync();
        const {message} = validationResult.errors.name;
        console.log(message,'--');
        assert(message === 'Name must be greater than 2 characters');
        done();

    });

    it.only('disallows invalid records from being saved', (done) => {
        const sansi = new User({ name: 'sa' });
        sansi.save()
            .catch((validationResult) => {
                const { message } = validationResult.errors.name;
                assert(message === 'Name must be greater than 2 characters');
                done();
            })
    });
});