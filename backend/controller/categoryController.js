const Category = require('../models/Category');
const fs = require('fs');
const path = require('path');

const addCategory = async (req, res) => {
    try {
        let productData = req.body;

        if (req.files && req.files.length > 0) {
            productData = {
                ...req.body,
                image: req.files[0].filename,
            }
        }
        const newCategory = new Category(productData);
        const addCategory = await newCategory.save();
        if (!addCategory) { return res.res.status(500).send({ err: "Unable to add category!" }); }

        res.status(200).json({ message: "Category added Successfully!", id: addCategory._id });
    } catch (error) {
        res.status(500).send({
            err: "Bad request!"
        });
    }
}

const getAllCategory = async (req, res) => {

    try {

        const category = await Category.find();

        if (!category) {
            return res.status(404).json({ err: "False Attempted!" });
        }
        res.status(200).json({ category: category });

    } catch (error) {

        res.status(500).send({ err: "Bad request!" });
    }
}

const getCategory = async (req, res) => {

    try {
        const products = await Category.findById(req.params.id);

        if (!products) {
            return res.status(404).json({ err: "False Attempted!" });
        }
        res.status(200).json({ products: products });

    } catch (error) {
        res.status(500).send({ err: "Bad request!" });
    }
}
const updateCategory = async (req, res) => {
    try {
        const { id, ...bodyData } = { ...req.body };

        const category = await Category.findByIdAndUpdate(id, bodyData);
        if (!category) {
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
const removeCategory = async (req, res) => {
    try {
        const id = req.body.id;
        const category = await Category.findByIdAndDelete(id).select('image -_id');

        if (!category) {
            return res.status(404).send({
                err: "Server is down!"
            });
        }
        const fileName = category.image;
        if (!(fileName === "default-product.png")) {
            const fileDest = '../public/uploads/categories/';

            fs.unlink(path.join(__dirname, fileDest + fileName), (err) => {
                if (err) {
                    res.status(404).json({ err: err });
                }
            });
        }
        res.status(200).json({ message: "Deleted Successfully!" });
    } catch (error) {
        res.status(500).send({
            err: "Bad Request!"
        });
    }
}


module.exports = { addCategory, getAllCategory, getCategory, updateCategory, removeCategory };