const jwt = require("jsonwebtoken");
const handlebars = require('handlebars');
const emailValidator = require("email-validator");
const { supporter, readHTMLFile, transporter } = require("../../configs/mailer");
const User = require("../../model/user_schema");
require("dotenv").config();

const baseurl_for_reset_password = "http://localhost:3000/resetpassword/";

exports.forgotPassword = async (req, res) => {
    let userEmail = req.body.email;

    let emailValidation = emailValidator.validate(userEmail);

    if (!emailValidation) {
        return res.status(400).json({
            error: 'Enter a valid email!',
        });
    }

    try {
        const userDetails = await User.findOne({ email: userEmail });

        if (!userDetails) {
            return res.status(401).json({
                error: 'Enter a valid email!'
            })
        }

        const token = await jwt.sign(
            {
                email: userEmail,
            },
            process.env.SECRET_KEY,
            {
                expiresIn: 60 * 10
            }
        );

        let link = baseurl_for_reset_password + token;

        readHTMLFile(__dirname + '/../../helper/forgot_password_mail.html', async function (err, html) {
            var template = handlebars.compile(html);
            var replacements = {
                tokenLink: `${link}`
            };
            var resetPasswordMail = template(replacements);
            let mailOptions = {
                from: "help.connectx@gmail.com",
                to: `${userEmail}`,
                subject: "Reset Password",
                html: resetPasswordMail,
            };

            await supporter.sendMail(mailOptions);

        });

        return res.status(200).json({
            message: "Mail Sent Successfully!",
        });

    } catch (error) {
        return res.status(500).json({
            error: `${error}`,
        });
    }
}