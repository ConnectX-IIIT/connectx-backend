const User = require('../../model/user_schema');
const Conversation = require('../../model/conversation_schema');
const resizeImg = require('resize-img');
const fs = require('fs');
const cloudinary = require('../../configs/cloudinary');
const Discussion = require('../../model/discussion_schema');
const Question = require('../../model/question_schema');
const Post = require('../../model/post_schema');
const Group = require('../../model/group_schema');

exports.uploadPicture = async (req, res) => {
    const photo = req.file;
    const userId = req.userId;
    let photoHeight = req.body.height;
    let photoWidth = req.body.width;
    let photoType = req.body.type;

    if (photoHeight > photoWidth) {
        photoHeight = photoHeight * 400 / photoWidth;
        photoWidth = 400;
    } else if (photoHeight < photoWidth) {
        photoWidth = photoWidth * 400 / photoHeight;
        photoHeight = 400;
    } else {
        photoHeight = 400;
        photoWidth = 400;
    }

    try {
        const image = await resizeImg(fs.readFileSync(photo.path), {
            width: photoWidth,
            height: photoHeight
        });

        const userDetails = await User.findOne({ _id: userId });

        await fs.writeFileSync(photo.path, image);
        const result = await cloudinary.uploader.upload(photo.path, { quality: 'auto' });
        await fs.unlinkSync(photo.path);

        if (photoType == "true") {
            await User.updateOne(
                { _id: userId }, {
                $set: {
                    profilePicture: result.url,
                }
            });
        } else {
            await User.updateOne(
                { _id: userId }, {
                $set: {
                    backgroundPicture: result.url,
                }
            });
        }

        await Conversation.updateMany(
            { "userIds": userId },
            { $set: { "userProfiles.$": result.url } }
        )

        await Group.updateOne(
            { 'members.userId': userId },
            {
                $set: {
                    'members.$.userProfile': result.url,
                }
            }
        )

        await Discussion.updateMany(
            { _id: { $in: userDetails.discussions } },
            {
                $set: {
                    userProfile: result.url,
                },
            }
        )

        await Question.updateMany(
            { _id: { $in: userDetails.questions } },
            {
                $set: {
                    userProfile: result.url,
                },
            }
        )

        await Post.updateMany(
            { _id: { $in: userDetails.posts } },
            {
                $set: {
                    userProfile: result.url,
                },
            }
        )

        return res.status(200).json({
            url: result.url,
        })

    } catch (error) {
        return res.status(500).json({
            error: `Server error occured!`
        })
    }
};