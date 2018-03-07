const Router = require('koa-router');

const post = new Router();
const postCtrl  = require('./posts.controller');


post.post('/', postCtrl.create)
post.get('/', postCtrl.list)
post.get('/:id', postCtrl.get)

module.exports = post;
