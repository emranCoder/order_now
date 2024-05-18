const Message = require('../models/Message');

const placeMessage = async (req, res) => {
    try {
        let productData = req.body;

        const newMessage = new Message(productData);
        const addMessage = await newMessage.save();
        if (!addMessage) { return res.res.status(500).send({ err: "Unable to add message!" }); }

        res.status(200).json({ mess: "Message Send successfully!", id: addMessage._id });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            err: "Bad request!"
        });
    }
}

const getAllMessage = async (req, res) => {

    try {

        const messages = await Message.find().
            sort({ status: '1' });

        if (!messages) {
            return res.status(404).json({ err: "False Attempted!" });
        }

        res.status(200).json({ message: messages });

    } catch (error) {

        res.status(500).send({ err: "Bad request!" });
    }
}



const getMessage = async (req, res) => {

    try {
        const message = await Message.findById(req.params.id);

        if (!message) {
            return res.status(404).json({ err: "False Attempted!" });
        }
        res.status(200).json({ message: message });

    } catch (error) {
        res.status(500).send({ err: "Bad request!" });
    }
}
const updateMessage = async (req, res) => {
    try {

        if (!(req.uRole === "admin")) return res.status(500).send({ err: "Server is down!" });
        const { id, ...bodyData } = { ...req.body };

        const message = await Message.findByIdAndUpdate(id, { status: true });
        if (!message) {
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
const removeMessage = async (req, res) => {
    try {
        if (!(req.uRole === "admin")) return res.status(500).send({ err: "Server is down!" });
        const id = req.body.id;
        const message = await Message.findByIdAndDelete(id).select('-_id');

        if (!message) {
            return res.status(404).send({
                err: "Server is down!"
            });
        }

        res.status(200).json({ mess: "Deleted Successfully!" });
    } catch (error) {
        res.status(500).send({
            err: "Bad Request!"
        });
    }
}


module.exports = { placeMessage, getAllMessage, getMessage, updateMessage, removeMessage };