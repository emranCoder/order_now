const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');



const checkPwd = async (l_pwd, user_pwd, value) => {
    try {
        const pwd = await bcrypt.compare(l_pwd, user_pwd);
        if (pwd) {
            const token = await jwt.sign({ token: value }, process.env.JWT_SECRETS, { expiresIn: process.env.JWT_EXPIRY });
            return token;
        }
        return pwd;
    } catch (error) {
        return false;
    }


}

const hashedPwd = async (pwd) => {
    const hash = await bcrypt.hash(pwd, 12);
    return hash;
}

const tokenVerify = async (value) => {
    try {

        const decoded = await jwt.verify(value, process.env.JWT_SECRETS);
        let token = null;
        if (decoded) {
            token = { ...decoded };
        }
        return token;
    } catch (error) {
        return error;
    }

}

const generateString = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

const generateOTP = () => {
    // Declare a digits variable 
    // which stores all digits  
    let digits = '0123456789';
    let OTP = '';
    let len = digits.length
    for (let i = 0; i < 4; i++) {
        OTP += digits[Math.floor(Math.random() * len)];
    }

    return OTP;
}



module.exports = { checkPwd, hashedPwd, tokenVerify, generateString, generateOTP };