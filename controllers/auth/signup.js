const User = require('../../model/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const handlebars = require('handlebars');
const { passwordValidate } = require('../../helper/password_validator');
const emailValidator = require("email-validator");
const { readHTMLFile, transporter } = require('../../configs/mailer');
require('dotenv').config();

const baseurl_for_user_verification = "https://obscure-ridge-13663.herokuapp.com/auth/verify/";

exports.register = async (req, res) => {

    const { name, email, mobile, password, batch, passingYear, joiningYear, cPassword } = req.body;

    if (!name || !email || !mobile || !password || !batch || !passingYear || !joiningYear || !cPassword) {
        return res.status(400).json({
            error: 'Please fill all details properly'
        })
    }

    if (password != cPassword) {
        return res.status(401).json({
            error: 'Password not matched'
        })
    }

    let emailValidation = emailValidator.validate(email);

    if (!emailValidation) {
        return res.status(404).json({
            error: 'Enter a valid email',
        });
    }

    let passwordValidation = passwordValidate(password);

    if (!passwordValidation[0]) {
        return res.status(403).json({
            error: `${passwordValidation[1]}`,
        });
    }

    try {
        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(402).json({
                error: 'user already exists'
            })
        }

        const hash = await bcrypt.hash(password, 10);

        const user = new User({ name, email, mobile, password: hash, batch, passingYear, joiningYear });
        await user.save();

        const token = await jwt.sign(
            {
                email: email,
            },
            process.env.SECRET_KEY
        );

        let link = baseurl_for_user_verification + token;

        readHTMLFile(__dirname + '/../../helper/user_verification_mail.html', async function (err, html) {
            var template = handlebars.compile(html);
            var replacements = {
                username: `${name}`,
                tokenLink: `${link}`
            };
            var userVerificationMail = template(replacements);
            let mailOptions = {
                from: "verify.connectx@gmail.com",
                to: `${user.email}`,
                subject: "Confirmation mail",
                html: userVerificationMail,
            };

            await transporter.sendMail(mailOptions);

        });

        return res.status(200).json({
            message: 'user registered successfully',
            token: `${token}`
        })

    } catch (err) {
        return res.status(500).json({
            error: `${err}`
        })
    }
}