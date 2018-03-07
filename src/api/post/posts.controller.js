const Post = require('models/post');
const Joi = require('joi');
const { Types : { ObjectId } } = require('mongoose');



exports.create  = async (ctx) => {
    const {
        title,
        authors,
        tags,
        desc
    } = ctx.request.body;

    const post = new Post({
        title,
        authors,
        tags,
        desc
    });

    try {
        await post.save();
    }
    catch (e) {
        return ctx.throw(500,e)
    }
    ctx.body = post;
};


exports.list = async (ctx) => {
    let posts;

    try {
        posts = await Post.find().exec();
    }
    catch (e) {
        return ctx.throw(500,e)
    }
    ctx.body = posts;
};

exports.get = async (ctx) => {
    const {id} = ctx.params;

    let post;

    try {
        post = await Post.findById(id).exec();
    }
    catch (e) {
        if (e.name === 'CastError') {
            ctx.status = 400;
            return
        }
        return ctx.throw(500,e)
    }
    if (!post) {
        ctx.status = 404;
        ctx.body = {
            message : 'post not found'
        }
        return;
    }
    ctx.body = post;
}


exports.delete = async (ctx) => {
    const {id} = ctx.params;

    try {
        await Post.findByIdAndRemove(id).exec();
    }
    catch(e) {
        if (e.name === 'CastError') {
            ctx.status = 400;
            return
        }
    }
    ctx.status = 204;
}

exports.replace = async (ctx) => {
    const {id} = ctx.params;
    if(!ObjectId.isValid(id)) {
        stx.status = 400;
        return
    }
    const schema = Joi.object().keys({
        title: Joi.string().required(),
        authors: Joi.array().items(Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().email().required()
        })),
        desc: Joi.string().required(),
        tags: Joi.array().items((Joi.string()).required())
    });

    const result = Joi.validate(ctx.request.body, schema);

    if(result.error) {
        ctx.status = 400; // Bad Request
        ctx.body = result.error;
        return;
    }

    let post;

    try {
        post = await Post.findByIdAndUpdate(id, ctx.request.body, {
            upsert : true,
            new : true
        })
    }
    catch(e) {
        return ctx.throw(500,e)
    }
    ctx.body = post;
}

exports.update = async (ctx) => {
    const {id} = ctx.params;
    if(ObjectId.isValid(id)) {
        ctx.status = 400;
        return
    }

    let post;

    try {
        post = await Post.findByIdAndUpdate(id, ctx.request.body, {
            new : true
        })
    }
    catch(e) {
        return ctx.throw(500,e)
    }
    ctx.body = post
}
