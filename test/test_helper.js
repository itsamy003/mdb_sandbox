const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
before((done) => {
    mongoose.connect('mongodb://localhost/user_test', { useNewUrlParser: true });
    mongoose.connection
        .once('open', () => {console.log('Good to go.....'); done();})
        .on('error', (error) => {
            console.log('Warning', error);
        });
});

beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
        done();
    });
});    