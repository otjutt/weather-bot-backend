const { Message } = require('../models/index');

async function create(req, res) {
    let message = null;
    try {
        message = await Message
            .create({
                sessionId: req.body.sessionId,
                author: 'user',
                message: req.body.message
            });

    } catch (e) {
        console.log('Error! Exception in message create API.');
        console.log(e.message);
        return res.status(400).send({
            message: "Something went wrong."
        });
    }
    return res.status(201).send(message);
}

async function list(req, res) {
    let findObj = {};
    if (typeof req.query.sessionId !== 'undefined') {
        findObj.where = {
            sessionId: req.query.sessionId
        };
    }

    let messages = null;
    try {
        messages = await Message.findAll(findObj);
    } catch (e) {
        console.log('Error! Exception in message list API.');
        console.log(e.message);
        return res.status(400).send({
            message: "Something went wrong."
        });
    }
    return res.send(messages);
}

module.exports = { create, list };
