const Group = require('../../model/group_schema');

exports.updateDescription = async (req, res) => {

    const userId = req.userId;
    const userDetails = req.userDetails;
    let description = req.body.description;

    try {
        const user = await Group.findOne(
            { members: { $elemMatch: { userId: userId } } }
        )

        if (!user) {
            return res.status(400).json({
                error: `You can't edit description!`
            })
        }

        await Group.updateOne(
            { name: userDetails.batch + "-" + userDetails.joiningYear },
            {
                $set: {
                    description,
                }
            }
        )

        return res.status(200).json({
            message: "Description updated!",
        })

    } catch (error) {
        return res.status(500).json({
            error: `Server error occured!`
        })
    }
};