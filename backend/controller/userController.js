const User = require('../models/User');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const { hashedPwd, generateOTP } = require('../config/utility');
const path = require('path');


const addUser = async (req, res) => {
    try {
        ;
        const encPwd = await hashedPwd(req.body.pwd);
        const uData = { ...req.body, pwd: encPwd, }

        const newUser = new User(uData);
        const addUser = await newUser.save();
        if (!addUser) { return res.res.status(500).send({ err: "Unable to add user!" }); }

        res.status(200).json({ message: "Welcome! Enjoy the day." });
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
        const queryId = req.params.id;
        let user;
        if (queryId === "auth") {
            user = await User.findById(req.uID).select('-pwd -__v -auth');
        } else {
            user = await User.findById(queryId).select('-pwd -__v -auth');
        }
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
        const { id, ...bodyData } = { ...req.body };

        const user = await User.findByIdAndUpdate(id, bodyData);
        if (!user) {
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

const removeUser = async (req, res) => {
    try {
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
        res.status(200).json({ mess: "Deleted Successfully!" });
    } catch (error) {
        res.status(500).send({
            err: "Bad Request!"
        });
    }
}




module.exports = { addUser, getUser, updateUser, removeUser, getAllUser };
