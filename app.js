require('dotenv').config();

const Koa = require('koa');
const Router = require('koa-router');

const router = new Router()
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.mongo_URI)
    .then(res => console.log('mongoDB connect sucess!'))
    .catch(err => console.log(err))


app.use(function* () {
    this.body = 'hello world'
})

app.listen(3000, () => {
    console.log('server running on localhost:3000')
})
