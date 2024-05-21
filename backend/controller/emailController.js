const Token = require('../models/Token');
const { generateOTP } = require('../config/utility');
const sendEmail = require('../middleware/send_email')

const sendOtp = async (req, res) => {
    try {
        const otp = generateOTP();
        const data = { mail: req.body.email, otp: otp, }
        const newToken = new Token(data);
        const addToken = await newToken.save();
        if (!addToken) { return res.res.status(500).send({ err: "Please try again later!" }); }


        const msg = `Hello,
    Thank you for with ${process.env.APP_NAME}. To complete the verification process and ensure the security of your account, please use the following One-Time Password (OTP):
    
    Verification Code: ${otp}
    
    Please enter this code on the verification page to confirm your email address and activate your account. Please note that this OTP is valid for a limited time only.`;


        await sendEmail(addToken.mail, "Verify User", msg);

        res.status(200).json({ message: "Please! Confirm your OTP." });

    } catch (error) {
        res.status(500).send({
            err: "Bad request!"
        });
    }

}

const VerifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const token = await Token.find({ mail: email }).sort({ createdAt: -1 });
        if (!token) { return res.res.status(500).send({ err: "Unable to send email!" }); }
        if (!(otp === token[0].otp)) { return res.status(500).send({ err: "Please check your email. Incorrect OTP." }); }

        res.status(200).json({ message: "Grate! Put your information." });

    } catch (error) {
        res.status(500).send({
            err: "Bad request!"
        });
    }
}


module.exports = { sendOtp, VerifyOtp };