const Router = require('koa-router');

const api = new Router();
const post = require('./post');

api.use('/post', post.routes());



module.exports = api;
