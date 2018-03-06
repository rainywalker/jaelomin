const Router = require('koa-router');

const post = new Router();
const foo  = require('./posts.controller');
post.get('/', (ctx, next) => {
    ctx.body = 'xxxx GET ' + ctx.request.path;
});


post.post('/', foo.create)

module.exports = post;
