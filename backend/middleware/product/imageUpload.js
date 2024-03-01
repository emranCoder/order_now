const Uploader = require('../Uploader');


function imageUpload(req, res, next) {
    const upload_product = Uploader("products", ["image/jpeg", "image/jpg", "image/png"], 5000000, "Only .jpg, jpeg or .png format allowed!");
    upload_product.any()(req, res, (err) => {
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


module.exports = imageUpload;