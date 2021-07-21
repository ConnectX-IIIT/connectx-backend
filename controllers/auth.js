const User = require('../model/userSchema');

exports.register = (req, res) => {
    const { name, email, mobile, password, batch, passingYear } = req.body;

    if (!name || !email || !mobile || !password || !batch || !passingYear) {
        return res.status(400).json({
            error: 'Please fill all details properly'
        })
    }

    User
        .findOne({ email: email })
        .then((userExist) => {

            if (userExist) {
                return res.status(401).json({
                    error: 'user already exists'
                })
            }

            const user = new User({ name, email, mobile, password, batch, passingYear });

            user.save()
                .then(() => {
                    return res.status(200).json({
                        message: 'user registered successfully'
                    })
                })
                .catch((err) => {
                    return res.status(500).json({
                        error: 'Failed to register'
                    })
                })
        })
        .catch((err) => {
            return res.status(501).json({
                error: 'error occured'
            })
        })
}