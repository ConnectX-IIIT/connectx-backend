const Post = require("../../model/post_schema");

exports.getPosts = async (req, res) => {

    const typeOfPosts = req.params.key;

    // db.demo33.aggregate({$unwind:"$ListOfStudent"}, { $group : {_id:'$_id', ct:{$sum:1}}}, { $sort :{ ct: -1}} );
    // db.users.aggregate([{ $sort : { age : -1, posts: 1 } }])

    try {
        const posts = await getPostsByType(typeOfPosts);

        return res.status(200).json({
            postData: posts
        })

    } catch (err) {
        return res.status(500).json({
            error: `Server error occured!`,
        });
    }
}

async function getPostsByType(type) {
    switch (type) {
        case '1':
            return Post.find().sort({ "timestamp": -1 });
        case '2':
            return Post.find({ $or: [{ isProject: true }, { jobLink: { $ne: "" } }] }).sort({ "timestamp": -1 });
        case '3':
            return Post.find({ isProject: false }).sort({ "timestamp": -1 });
        case '4':
            return Post.find({ jobLink: "" }).sort({ "timestamp": -1 });
        case '5':
            return Post.find({ jobLink: { $ne: "" } }).sort({ "timestamp": -1 });
        case '6':
            return Post.find({ isProject: false, jobLink: "" }).sort({ "timestamp": -1 });
        case '7':
            return Post.find({ isProject: true }).sort({ "timestamp": -1 });
        default:
            return [];
    }
}