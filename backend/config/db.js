const mongoose = require('mongoose');

const connectToMongo = async () => {
    let url = process.env.DB_URL;
    try {
        mongoose.connect(url)
        console.log("MongoDB Connected...");
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectToMongo;