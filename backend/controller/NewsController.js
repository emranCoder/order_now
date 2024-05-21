const News = require('../models/News');
const fs = require('fs');
const path = require('path');


const addNews = async (req, res) => {
    try {
        if (!(req.uRole === "admin")) return res.status(500).send({ err: "Server is down!" });
        let newsData = req.body;

        if (req.files && req.files.length > 0) {
            newsData = {
                ...req.body,
                image: req.files[0].filename,
            }
        }
        const newNews = new News(newsData);
        const addNews = await newNews.save();
        if (!addNews) { return res.res.status(500).send({ err: "Unable to add news!" }); }

        res.status(200).json({ message: "News added Successfully!", id: addNews._id });
    } catch (error) {

        res.status(500).send({
            err: "Bad request!"
        });
    }
}

const getAllNews = async (req, res) => {

    try {

        const news = await News.find();

        if (!news) {
            return res.status(404).json({ err: "False Attempted!" });
        }
        res.status(200).json({ news: news });

    } catch (error) {

        res.status(500).send({ err: "Bad request!" });
    }
}

const getNews = async (req, res) => {
    try {
        const query = req.params.id;

        const news = await News.findOne({ code: query });

        if (!news) {
            return res.status(404).json({ err: "False Attempted!" });
        }
        res.status(200).json({ news: news });

    } catch (error) {
        console.log(error)
        res.status(500).send({ err: "Bad request!" });
    }
}
const updateNews = async (req, res) => {
    try {
        if (!(req.uRole === "admin")) return res.status(500).send({ err: "Server is down!" });
        const { id, oldImg, ...bodyData } = { ...req.body };
        let newData;
        if (req.files && req.files.length > 0) {

            const fileName = oldImg;
            if (!(fileName === "default-product.png")) {
                const fileDest = '../public/uploads/news/';

                fs.unlink(path.join(__dirname, fileDest + fileName), (err) => {

                });
            }
            newData = { ...bodyData, image: req.files[0].filename, };
        }



        const news = await News.findByIdAndUpdate(id, newData);
        if (!news) {
            return res.status(500).send({
                err: "Server is down!"
            });
        }
        res.status(200).json({ message: "You got an update!" });
    } catch (error) {
        res.status(500).send({
            err: "Bad request!"
        });
    }
}
const removeNews = async (req, res) => {
    try {
        if (!(req.uRole === "admin")) return res.status(500).send({ err: "Server is down!" });
        const id = req.body.id;
        const news = await News.findByIdAndDelete(id).select(' -_id');

        if (!news) {
            return res.status(404).send({
                err: "Server is down!"
            });
        }

        res.status(200).json({ message: "Deleted Successfully!" });
    } catch (error) {
        res.status(500).send({
            err: "Bad Request!"
        });
    }
}


module.exports = { addNews, getAllNews, getNews, updateNews, removeNews };