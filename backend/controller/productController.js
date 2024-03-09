const Product = require('../models/Product');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const { hashedPwd } = require('../config/utility');
const path = require('path');

const addProduct = async (req, res) => {
    try {
        let productData = req.body;

        if (req.files && req.files.length > 0) {
            productData = {
                ...req.body,
                image: req.files[0].filename,
            }
        }
        const newProduct = new Product(productData);
        const addProduct = await newProduct.save();
        if (!addProduct) { return res.res.status(500).send({ err: "Unable to add product!" }); }

        res.status(200).json({ message: "Product added Successfully!", id: addProduct._id });
    } catch (error) {

        res.status(500).send({
            err: "Bad request!"
        });
    }
}

const getAllProduct = async (req, res) => {

    try {

        const products = await Product.find();

        if (!products) {
            return res.status(404).json({ err: "False Attempted!" });
        }
        res.status(200).json({ products: products });

    } catch (error) {

        res.status(500).send({ err: "Bad request!" });
    }
}

const getProduct = async (req, res) => {

    try {
        const products = await Product.findById(req.params.id);

        if (!products) {
            return res.status(404).json({ err: "False Attempted!" });
        }
        res.status(200).json({ product: products });

    } catch (error) {
        res.status(500).send({ err: "Bad request!" });
    }
}
const updateProduct = async (req, res) => {
    try {
        const { id, oldImg, ...bodyData } = { ...req.body };

        let newData = bodyData;

        if (req.files && req.files.length > 0) {

            const fileName = oldImg;
            if (!(fileName === "default-product.png")) {
                const fileDest = '../public/uploads/products/';

                fs.unlink(path.join(__dirname, fileDest + fileName), (err) => {

                });
            }
            newData = { ...bodyData, image: req.files[0].filename, };
        }

        const product = await Product.findByIdAndUpdate(id, newData);

        if (!product) {
            return res.status(500).send({
                err: "Server is down!"
            });
        }
        res.status(200).json({ message: "You got an update!", data: product });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            err: "Bad request!"
        });
    }
}
const removeProduct = async (req, res) => {
    try {
        const id = req.body.id;
        const product = await Product.findByIdAndDelete(id).select('image -_id');
        if (!product) {
            return res.status(404).send({
                err: "Server is down!"
            });
        }
        const fileName = product.image;
        if (!(fileName === "default-product.png")) {
            const fileDest = '../public/uploads/products/';

            fs.unlink(path.join(__dirname, fileDest + fileName), (err) => {

            });
        }
        res.status(200).json({ message: "Deleted Successfully!" });
    } catch (error) {

        res.status(500).send({
            err: "Bad Request!"
        });
    }
}


module.exports = { addProduct, getAllProduct, getProduct, updateProduct, removeProduct };