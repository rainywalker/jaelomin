const Post = require('models/post');


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
