const express = require('express');
const User = require('../models/User');
const { checkPwd, tokenVerify } = require('../config/utility');

const login = async (req, res) => {

    try {
        const { username, pwd } = { ...req.body };

        const user = await User.findOne({ $or: [{ username: username }, { mobile: username }, { email: username }] }).select('pwd auth');
        if (!user) {
            return res.status(404).send({
                err: "Please try to login with your username & password!",
            });
        }
        const userPwd = user.pwd;
        const userId = user._id;
        const value = username + "_" + userId;
        const token = await checkPwd(pwd, userPwd, value);

        if (!token) {
            return res.status(404).send({
                err: "Authentication failed!",
            });
        }

        const authToken = {
            token: token,
            logIn: Date.now(),
            logOut: null,
        }
        user.auth = authToken;
        const tokenUpdate = await user.save();
        if (!tokenUpdate) {
            return res.status(404).send({
                err: "Authentication failed!",
            });
        }
        res.status(200).json({ token: authToken.token, id: userId });
    } catch (error) {
        res.status(500).send({
            err: "Bad request!"
        });
    }
}

const logout = async (req, res, next) => {

    try {
        const qId = req.body.id;
        if (!(req.uID === qId)) {
            return res.status(404).send({
                err: "False Attempted!"
            });
        }
        const user = await User.findById(qId).select("auth");
        if (!user) {
            return res.status(404).send({
                err: "Please try to login with your username & password!",
            });
        }

        const authToken = {
            ...user.auth[0],
            token: null,
            logOut: Date.now(),
        }
        user.auth = authToken;
        const tokenUpdate = await user.save();
        if (!tokenUpdate) {
            return res.status(500).send({
                err: "Server is Down!",
            });
        }

        res.status(200).json({
            mess: "We will miss you!"
        });
    } catch (error) {
        res.status(500).send({
            err: "Bad request!",
        });
    }
}



module.exports = { login, logout };