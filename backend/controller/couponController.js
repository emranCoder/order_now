const Coupon = require('../models/Coupon');


const addCoupon = async (req, res) => {
    try {
        if (!(req.uRole === "admin")) return res.status(500).send({ err: "Server is down!" });
        const couponData = req.body;
        const newCoupon = new Coupon(couponData);
        const addCoupon = await newCoupon.save();
        if (!addCoupon) { return res.res.status(500).send({ err: "Unable to add coupon!" }); }

        res.status(200).json({ message: "Coupon added Successfully!", id: addCoupon._id });
    } catch (error) {
        res.status(500).send({
            err: "Bad request!"
        });
    }
}

const getAllCoupon = async (req, res) => {

    try {

        const coupon = await Coupon.find();

        if (!coupon) {
            return res.status(404).json({ err: "False Attempted!" });
        }
        res.status(200).json({ coupon: coupon });

    } catch (error) {

        res.status(500).send({ err: "Bad request!" });
    }
}

const getCoupon = async (req, res) => {

    try {
        const products = await Coupon.findById(req.params.id);

        if (!products) {
            return res.status(404).json({ err: "False Attempted!" });
        }
        res.status(200).json({ products: products });

    } catch (error) {
        res.status(500).send({ err: "Bad request!" });
    }
}
const updateCoupon = async (req, res) => {
    try {
        if (!(req.uRole === "admin")) return res.status(500).send({ err: "Server is down!" });
        const { id, ...bodyData } = { ...req.body };

        const coupon = await Coupon.findByIdAndUpdate(id, bodyData);
        if (!coupon) {
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
const removeCoupon = async (req, res) => {
    try {
        if (!(req.uRole === "admin")) return res.status(500).send({ err: "Server is down!" });
        const id = req.body.id;
        const coupon = await Coupon.findByIdAndDelete(id).select(' -_id');

        if (!coupon) {
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


module.exports = { addCoupon, getAllCoupon, getCoupon, updateCoupon, removeCoupon };