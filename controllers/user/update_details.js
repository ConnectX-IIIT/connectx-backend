const emailValidator = require("email-validator");
const { readHTMLFile, transporter } = require("../../configs/mailer");
const User = require("../../model/user_schema");
const jwt = require('jsonwebtoken');
const handlebars = require('handlebars');
require('dotenv').config();
const baseurl_for_user_verification = "https://obscure-ridge-13663.herokuapp.com/auth/verify/";

exports.updateDetails = async (req, res) => {

    const userId = req.userId;
    const email = req.email;
    const { userName, userEmail, mobile, description } = req.body;

    try {
        if (userEmail == email) {

            await User.updateOne(
                { _id: userId }, {
                $set: {
                    name: userName,
                    mobile,
                    description,
                }
            });

            return res.status(200).json({
                message: "details updated successfully!",
            });

        } else {
            const userDetails = await User.findOne({ email: userEmail });

            if (userDetails) {
                return res.status(400).json({
                    error: 'User already exists!'
                })
            }

            const emailValidation = emailValidator.validate(userEmail);

            if (!emailValidation) {
                return res.status(401).json({
                    error: 'Enter a valid email!',
                });
            }

            await User.updateOne(
                { _id: userId }, {
                $set: {
                    name: userName,
                    email: userEmail,
                    mobile,
                    description,
                }
            });

            const token = await jwt.sign(
                {
                    userId: userId,
                    email: userEmail
                },
                process.env.SECRET_KEY,
                {
                    expiresIn: "30d"
                }
            );

            let link = baseurl_for_user_verification + token;

            readHTMLFile(__dirname + '/../../helper/user_verification_mail.html', async function (err, html) {
                var template = handlebars.compile(html);
                var replacements = {
                    username: `${userName}`,
                    tokenLink: `${link}`
                };
                var userVerificationMail = template(replacements);
                let mailOptions = {
                    from: "verify.connectx@gmail.com",
                    to: `${userEmail}`,
                    subject: "Confirmation mail",
                    html: userVerificationMail,
                };

                await transporter.sendMail(mailOptions);

            });

            return res.status(201).json({
                message: "details updated successfully!",
                token: `${token}`,
            });

        }
    } catch (err) {
        return res.status(500).json({
            error: "Server error occured!",
        });
    }
}