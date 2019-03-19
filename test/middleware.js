const User = require('../src/user');
const BlogPost = require('../src/blogPost');
const assert = require('assert');

describe('Middleware', (done) => {
    let ammi, blogPost;

    beforeEach((done) => { 
        ammi = new User({ name: 'Ammi', likes: 4 });
        blogPost = new BlogPost({ title: 'Blog 1', content: 'My first blog post' });
    
        ammi.blogPosts.push(blogPost);
    
        Promise.all([ammi.save(), blogPost.save()])
            .then(() => done());
    });

    it.only('user cleans up dangling blogposts on remove', (done) => {
        ammi.remove().then(()=> BlogPost.count())
        .then((count) => {
            assert(count === 0);
            done();
        });
    });
});