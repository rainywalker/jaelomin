const Router = require('koa-router');

const api = new Router();
const post = require('./post');
const auth = require('./auth');

api.use('/post', post.routes());
api.use('/auth', auth.routes());




module.exports = api;
