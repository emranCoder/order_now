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

        res.status(200).json({ mess: "Order added Successfully!", id: addOrder._id });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            err: "Bad request!"
        });
    }
}

const getAllOrder = async (req, res) => {

    try {

        const orders = await Order.find().
            sort({ orderDate: '1' }).populate('user', 'fName lName').populate("products");

        if (!orders) {
            return res.status(404).json({ err: "False Attempted!" });
        }
        let x = 0;
        orders.map((val, key) => (x += parseFloat(val.orderPrice)))
        res.status(200).json({ order: orders, total: x });

    } catch (error) {

        res.status(500).send({ err: "Bad request!" });
    }
}

const getUserOrder = async (req, res) => {

    try {

        const order = await Order.find({ user: req.params.id });

        if (!order) {
            return res.status(404).json({ err: "False Attempted!" });
        }
        res.status(200).json({ order: order });

    } catch (error) {
        console.log(error)
        res.status(500).send({ err: "Bad request!" });
    }
}

const getOrder = async (req, res) => {

    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ err: "False Attempted!" });
        }
        res.status(200).json({ order: order });

    } catch (error) {
        res.status(500).send({ err: "Bad request!" });
    }
}
const updateOrder = async (req, res) => {
    try {
        if (!(req.uRole === "admin")) return res.status(500).send({ err: "Server is down!" });
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
        if (!(req.uRole === "admin")) return res.status(500).send({ err: "Server is down!" });
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


module.exports = { placeOrder, getAllOrder, getOrder, updateOrder, getUserOrder, removeOrder };