const { Session } = require('../models/index');

async function create(req, res) {
    let session = null;
    try {
        session = await Session
            .create({
            });

    } catch (e) {
        console.log('Error! Exception in session create API.');
        console.log(e.message);
        return res.status(400).send({
            message: "Something went wrong."
        });
    }
    return res.status(201).send(session);
}

async function list(req, res) {
    let sessions = null;
    try {
        sessions = await Session.findAll();
    } catch (e) {
        console.log('Error! Exception in session list API.');
        console.log(e.message);
        return res.status(400).send({
            message: "Something went wrong."
        });
    }
    return res.status(200).send(sessions);
}

async function update(req, res) {
    // Check if object exists.
    let session = null;
    try {
        session = await Session.findOne({
            where: {
                id: req.params.id
            }
        })
    } catch (e) {
        console.log('Error! Exception in session update API.');
        console.log(e.message);
        return res.status(400).send({
            message: "Something went wrong."
        });
    }
    if (session === null) {
        res.status(404).send({
            error: "Error! Session not found."
        })
    }

    // Update object.
    let isActive = session.isActive;
    if (typeof req.body.isActive !== 'undefined') {
        session.isActive = req.body.isActive;
    }
    await session.save();

    // Return response.
    return res.status(200).send(session)
}

async function read(req, res) {
    let session = null;
    try {
        session = await Session.findOne({
            where: {
                id: req.params.id
            }
        })
    } catch (e) {
        console.log('Error! Exception in session read API.');
        console.log(e.message);
        return res.status(400).send({
            message: "Something went wrong."
        });
    }
    if (session === null) {
        return res.status(404).send({
            error: "Session not found!"
        })
    }

    return res.send(session);
}

module.exports = { create, list, update, read };
