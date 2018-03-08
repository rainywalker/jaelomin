const Router = require('koa-router');

const post = new Router();

const handler = (ctx, next) => {
    ctx.body = `${ctx.request.method} ${ctx.request.path}`;
};

post.get('/', handler);

post.post('/', handler);

post.delete('/', handler);

post.put('/', handler);

post.patch('/', handler);

module.exports = post;
