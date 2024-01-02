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


module.exports = { checkPwd, hashedPwd, tokenVerify };