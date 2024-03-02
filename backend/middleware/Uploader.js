const path = require('path');
const multer = require('multer');
const createHttpError = require('http-errors');



const Uploader = function (sub_folder, file_type, max_file_size, err_msg) {

    const U_FOLDER = path.join(__dirname, '../public') + `/uploads/${sub_folder}/`;
    //Store data to the location
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, U_FOLDER);
        },
        filename: (req, file, cb) => {
            
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9)
            const fileExt = path.extname(file.originalname);
            const fileName = file.originalname.replace(fileExt, "").toLowerCase().split(" ").join("-") + "-" + uniqueSuffix;

            cb(null, fileName + fileExt);
        }
    });
    //check file type validation
    const upload = multer({
        storage: storage,
        limits: {
            fileSize: max_file_size,
        },
        fileFilter: (req, file, cb) => {

            if (file_type.includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(createHttpError(err_msg));
            }
        }
    });

    return upload;

}

module.exports = Uploader;