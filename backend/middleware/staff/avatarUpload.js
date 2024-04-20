const Uploader = require('../Uploader');

function avatarUpload(req, res, next) {
    const upload_avatar = Uploader("staffs", ["image/jpeg", "image/jpg", "image/png"], 1000000, "Only .jpg, jpeg or .png format allowed!");
    upload_avatar.any()(req, res, (err) => {
        if (err) {
            res.status(500).json({
                errors: {
                    avatar: { msg: err.message },
                }
            })
        } else {
            next();
        }
    });

}


module.exports = avatarUpload;