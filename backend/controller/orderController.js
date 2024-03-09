const Order = require('../models/Order');
const { generateString } = require('../config/utility');
const fs = require('fs');
const path = require('path');

const placeOrder = async (req, res) => {
    try {
        let productData = req.body;

        productData = {
            ...productData,
            orderNumber: generateString(10)
        }
        const newOrder = new Order(productData);
        const addOrder = await newOrder.save();
        if (!addOrder) { return res.res.status(500).send({ err: "Unable to add order!" }); }

        res.status(200).json({ message: "Order added Successfully!", id: addOrder._id });
    } catch (error) {
        res.status(500).send({
            err: "Bad request!"
        });
    }
}

const getAllOrder = async (req, res) => {

    try {

        const products = await Order.find();

        if (!products) {
            return res.status(404).json({ err: "False Attempted!" });
        }
        res.status(200).json({ products: products });

    } catch (error) {

        res.status(500).send({ err: "Bad request!" });
    }
}

const getOrder = async (req, res) => {

    try {
        const products = await Order.findById(req.params.id);

        if (!products) {
            return res.status(404).json({ err: "False Attempted!" });
        }
        res.status(200).json({ products: products });

    } catch (error) {
        res.status(500).send({ err: "Bad request!" });
    }
}
const updateOrder = async (req, res) => {
    try {
        const { id, ...bodyData } = { ...req.body };

        const order = await Order.findByIdAndUpdate(id, bodyData);
        if (!order) {
            return res.status(500).send({
                err: "Server is down!"
            });
        }
        res.status(200).json({ mess: "You got an update!" });
    } catch (error) {
        res.status(500).send({
            err: "Bad request!"
        });
    }
}
const removeOrder = async (req, res) => {
    try {
        const id = req.body.id;
        const order = await Order.findByIdAndDelete(id).select('image -_id');

        if (!order) {
            return res.status(404).send({
                err: "Ser ver is down!"
            });
        }
        const fileName = order.image;
        if (!(fileName === "default-avatar.png")) {
            const fileDest = '../public/uploads/categories/';

            fs.unlink(path.join(__dirname, fileDest + fileName), (err) => {
                if (err) {
                    res.status(404).json({ err: err });
                }
            });
        }
        res.status(200).json({ mess: "Deleted Successfully!" });
    } catch (error) {
        res.status(500).send({
            err: "Bad Request!"
        });
    }
}


module.exports = { placeOrder, getAllOrder, getOrder, updateOrder, removeOrder };