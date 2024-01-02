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
                avatar: req.files[0].filename,
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

const getProduct = async (req, res) => { res.status(200).send("Products get") }
const updateProduct = async (req, res) => { res.status(200).send("Products update") }
const removeProduct = async (req, res) => { res.status(200).send("Products remove") }


module.exports = { addProduct, getProduct, updateProduct, removeProduct };