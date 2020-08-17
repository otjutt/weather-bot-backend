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
            status: 'error',
            code: 400,
            message: 'Error! Something went wrong.',
            data: null
        });
    }

    // Success response.
    return res.status(201).send({
        status: 'success',
        code: 201,
        message: 'Success! Created session.',
        data: session
    });
}

async function list(req, res) {
    let sessions = null;
    try {
        sessions = await Session.findAll();
    } catch (e) {
        console.log('Error! Exception in session list API.');
        console.log(e.message);
        return res.status(400).send({
            status: 'error',
            code: 400,
            message: 'Error! Something went wrong.',
            data: null
        });
    }

    // Success response.
    return res.status(200).send({
        status: 'success',
        code: 200,
        message: 'Success! Listed sessions.',
        data: sessions
    });
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
            status: 'error',
            code: 400,
            message: 'Error! Something went wrong.',
            data: null
        });
    }
    if (session === null) {
        return res.status(404).send({
            status: 'error',
            code: 404,
            message: 'Error! Session not found.',
            data: null
        });
    }

    // Update object.
    let isActive = session.isActive;
    if (typeof req.body.isActive !== 'undefined') {
        session.isActive = req.body.isActive;
    }
    await session.save();

    // Success response.
    return res.status(200).send({
        status: 'success',
        code: 200,
        message: 'Success! Updated session.',
        data: session
    });
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
            status: 'error',
            code: 400,
            message: 'Error! Something went wrong.',
            data: null
        });
    }
    if (session === null) {
        return res.status(404).send({
            status: 'error',
            code: 404,
            message: 'Error! Session not found.',
            data: null
        });
    }

    // Success response.
    return res.status(200).send({
        status: 'success',
        code: 200,
        message: 'Success! Read session.',
        data: session
    });
}

module.exports = { create, list, update, read };
