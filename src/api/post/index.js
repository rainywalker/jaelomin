const Router = require('koa-router');

const post = new Router();
const postCtrl  = require('./posts.controller');


post.post('/', postCtrl.create)
post.get('/', postCtrl.list)
post.get('/', postCtrl.list)
post.put('/:id', postCtrl.replace)

module.exports = post;
