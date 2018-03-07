const Joi = require('joi');
const Auth = require('models/auth');

//회원가입
exports.localRegister = async (ctx) => {

    const schema = Joi.object().keys({
        username : Joi.string().alphanum().min(4).max(15).required(),
        email: Joi.string().email().required(),
        password: Joi.string().required().min(4)
    });

    const result = Joi.validate(ctx.request.body, schema);

    if(result.error) {
        ctx.status = 400;
        return;
    }

    let existing = null;
    try {
        existing = await Auth.findByEmailOrUsername(ctx.request.body);
    }
    catch (e) {
        ctx.throw(500,e)
    }

    if(existing) {
       ctx.status = 409;
       ctx.body = {
           key : existing.email === ctx.request.body.email ? 'email' : 'username'
       }
       return
    }



    let account = null;
    try {
        account = await Auth.localRegister(ctx.request.body);
    } catch (e) {
        ctx.throw(500, e);
    }

    ctx.body = account.profile;
};


exports.localLogin = async ctx => {
    const schema = Joi.object().keys({
        email : Joi.string().email().required(),
        password : Joi.string().required()
    });

    const result = Joi.validate(ctx.request.body, schema);

    if (result.error) {
        ctx.status = 400;
        return
    }

    const {email, password} = ctx.request.body;

    let account = null;
    try {
        account = await Auth.findByEmail(email);
    }
    catch(e) {
        ctx.throw(500, e);
    }

    if(!account || !account.validatePassword(password)) {
        ctx.status = 403;
        return

    }

    ctx.body = account.profile;


};


exports.exists = async ctx => {
    const {key, value} = ctx.params;
    let account = null;

    try {
        account = await (key === 'email' ? Auth.findByEmail(value) : Auth.findByUserName(value))
    }
    catch(e) {
        ctx.throw(500, e)
    }

    ctx.body = {
        exists : account !== null
    }
};


exports.logout = async ctx => {
    ctx.body = 'logout';
};
