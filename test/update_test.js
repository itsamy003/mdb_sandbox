const  User = require('../src/user');
const  assert = require('assert');

describe('updating records', () => {
    let sansi;
    function assertName(operation, done) {
         operation
        .then(() => User.find({}))
        .then((users) => {
            assert(users.length === 1);
            assert(users[0].name === "sansi reddy");
            console.log(users);
            done();
        });
    }
    beforeEach((done) => {
        sansi = new User({name:'sansi', likes:1});
        sansi.save()
            .then(() => done());
    });

    it('instance type using set and save', (done) => {
        sansi.set('name', 'sansi reddy');
        assertName(sansi.save(), done);
        // sansi.save()
        //     .then(() => User.find({}))
        //     .then((users) => {
        //         assert(users.length === 1);
        //         assert(users[0].name === "Sansika Reddy");
        //         done();
        //     });
    });

    it('a model instance can update', (done) => {
        assertName(sansi.updateOne({name:'sansi reddy'}), done);
    });

    it('a model class can update', (done)=> {
        assertName(User.updateOne({name:'sansi'}, {name:'sansi reddy'}), done);
    });

    it('a model class can record with an id and update', (done)=> {
        assertName(User.findByIdAndUpdate(sansi._id, {name:'sansi reddy'}), done);
    });

    it('a user can have their postCount incremented by 1', (done) => {
         User.findOneAndUpdate({name:'sansi'}, {$inc : {likes : 5}})
         .then(() => User.findOne({name:'sansi'}))
         .then((user) => {
             assert(user.likes === 6);
             done();       
         })
    });
});