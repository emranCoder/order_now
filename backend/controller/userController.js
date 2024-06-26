const User = require('../models/User');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const { hashedPwd, generateOTP, checkPwd } = require('../config/utility');
const path = require('path');


const addUser = async (req, res) => {
    try {
        ;
        const encPwd = await hashedPwd(req.body.pwd);
        const uData = { ...req.body, pwd: encPwd, }

        const newUser = new User(uData);
        const addUser = await newUser.save();
        if (!addUser) { return res.res.status(500).send({ err: "Unable to add user!" }); }

        res.status(200).json({ message: "Welcome! Login to continue." });
    } catch (error) {
        res.status(500).send({
            err: "Bad request!"
        });
    }
}


const getAllUser = async (req, res) => {
    try {
        let user = await User.find().select('-pwd -__v -auth');

        if (!user) {
            return res.status(404).json({ err: "Server is Down!" });
        }
        res.status(200).json({ user: user });
    } catch (error) {
        res.status(500).send({
            err: "Bad request!"
        });
    }
}



const getUser = async (req, res) => {
    try {
        const queryId = (req.headers.id) ? req.headers.id : req.uID;

        const user = await User.findById(queryId).select('-pwd -__v -auth');

        if (!user) {
            return res.status(404).json({ err: "False Attempted!" });
        }
        res.status(200).json({ user: user });
    } catch (error) {
        res.status(500).send({
            err: "Bad request!"
        });
    }
}

const updateUser = async (req, res) => {
    try {
        const { id, oldImg, currentPwd, conPwd, ...bodyData } = { ...req.body };
        let newData = bodyData;

        const userImg = await User.findById(id).select('avatar pwd username');
        if (!userImg) {
            return res.status(500).send({
                err: "Server is down!"
            });
        }


        if (currentPwd && conPwd && bodyData.pwd) {
            if (!(conPwd === newData.pwd)) return res.status(404).send({ mess: "Passwords do NOT match!" });
            if (currentPwd === newData.pwd) return res.status(404).send({ mess: "Current Password & new password are same!" });

            const encPwd = await hashedPwd(bodyData.pwd);
            newData = { pwd: encPwd }

            const value = userImg.username + "_" + id;
            const token = await checkPwd(currentPwd, userImg.pwd, value);

            if (!token) return res.status(404).send({ mess: "Passwords do NOT match!" });
        }

        if (req.files && req.files.length > 0) {

            const fileName = oldImg;
            if (!(fileName === "default-product.png") && !(req.files[0].filename === userImg.avatar)) {
                const fileDest = '../public/uploads/avatars/';

                fs.unlink(path.join(__dirname, fileDest + fileName), (err) => {

                });
            }
            newData = { ...bodyData, avatar: req.files[0].filename, };
        }

        const user = await User.findByIdAndUpdate(id, newData).select('-pwd -__v -auth');
        if (!user) {
            return res.status(500).send({
                err: "Server is down!"
            });
        }
        res.status(200).json({ message: "Update Successfully!", user: user });
    } catch (error) {

        res.status(500).send({
            err: "Bad request!"
        });
    }
}

const removeUser = async (req, res) => {
    try {
        if (!(req.uRole === "admin")) return res.status(500).send({ err: "Server is down!" });
        const id = req.body.id;
        const user = await User.findByIdAndDelete(id).select('avatar -_id');
        if (!user) {
            return res.status(404).send({
                err: "Server is down!"
            });
        }
        const fileName = user.avatar;
        if (!(fileName === "default-avatar.png")) {
            const fileDest = '../public/uploads/avatars/';

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




module.exports = { addUser, getUser, updateUser, removeUser, getAllUser };
