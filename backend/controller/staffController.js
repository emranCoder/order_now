const Staff = require('../models/Staff');
const fs = require('fs');
const path = require('path');


const addStaff = async (req, res) => {
    try {
        if (!(req.uRole === "admin")) return res.status(500).send({ err: "Server is down!" });
        let uData = req.body;
        if (req.files && req.files.length > 0) {
            uData = {
                ...req.body,
                avatar: req.files[0].filename,
            }
        }

        const newStaff = new Staff(uData);
        const addStaff = await newStaff.save();
        if (!addStaff) { return res.res.status(500).send({ err: "Unable to add Staff!" }); }

        res.status(200).json({ message: "Staff added Successfully!", Staff: addStaff });
    } catch (error) {

        res.status(500).send({
            err: "Bad request!"
        });
    }
}

const getAllStaff = async (req, res) => {

    try {

        const staffs = await Staff.find();

        if (!staffs) {
            return res.status(404).json({ err: "Please! try again later." });
        }
        res.status(200).json({ staff: staffs });

    } catch (error) {

        res.status(500).send({ err: "Bad request!" });
    }
}



const getStaff = async (req, res) => {
    try {
        const queryId = req.params.id;
        if (!queryId) return res.status(500).json({ staff: null });

        const staff = await Staff.findById(queryId).select('-pwd -__v -auth');

        if (!staff) {
            return res.status(404).json({ err: "Please! try again later." });
        }
        res.status(200).json({ staff: staff });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            err: "Bad request!"
        });
    }
}

const updateStaff = async (req, res) => {
    try {
        if (!(req.uRole === "admin")) return res.status(500).send({ err: "Server is down!" });
        const { id, oldImg, ...bodyData } = { ...req.body };
        if (!id) return res.status(500).json({ staff: null });

        let newData = bodyData;

        if (req.files && req.files.length > 0) {

            const fileName = oldImg;
            if (!(fileName === "default-avatar.png")) {
                const fileDest = '../public/uploads/staffs/';

                fs.unlink(path.join(__dirname, fileDest + fileName), (err) => {

                });
            }
            newData = { ...bodyData, image: req.files[0].filename, };
        }

        const staff = await Staff.findByIdAndUpdate(id, newData);
        if (!staff) {
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

const removeStaff = async (req, res) => {
    try {
        if (!(req.uRole === "admin")) return res.status(500).send({ err: "Server is down!" });
        const id = req.body.id;
        if (!id) return res.status(500).json({ staff: null });

        const staff = await Staff.findByIdAndDelete(id).select('avatar -_id');
        if (!staff) {
            return res.status(404).send({
                err: "Server is down!"
            });
        }

        const fileName = staff.avatar;
        if (!(fileName === "default-avatar.png")) {
            const fileDest = '../public/uploads/staffs/';

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




module.exports = { addStaff, getStaff, updateStaff, removeStaff, getAllStaff };
