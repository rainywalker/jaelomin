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
}
