require('dotenv').config();

const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const router = new Router()
const app = new Koa();

const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');

const  { jwtMiddleware } = require('lib/token');


const api  = require('./api');
const port = process.env.PORT || 3000;

mongoose.Promise = global.Promise;
mongoose.connect(process.env.mongo_URI)
    .then(res => console.log('mongoDB connect sucess!'))
    .catch(err => console.log(err));


app.use(logger())
app.use(bodyParser());
app.use(jwtMiddleware);
router.use('/api', api.routes());
app.use(router.routes()).use(router.allowedMethods)



router.get('/', (ctx, next) => {
    ctx.body = 'home!!!'
})

router.get('/about', (ctx, next) => {
    ctx.body = 'about'
})





app.listen(port, () => {
    console.log('server running on localhost:3000')
})
