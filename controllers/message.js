const { Message } = require('../models/index');
const WitService = require('../service/wit-service');
const BotService = require('../service/bot-service');
const IntentWeather = require('../intent/intent-weather');
const IntentGreeting = require('../intent/intent-greeting');
const MessageService = require('../service/message-service');
const Validator = require('validatorjs');

async function create(req, res) {
    let validation = new Validator(req.body, {
        sessionId: 'required|integer',
        message: 'required|string'
    });
    if (validation.fails()) {
        let data = {
            status: 'error',
            code: 422,
            message: 'Error! Validation errors.',
            data: validation.errors.all()
        };
        return res.status(data.code).send(data);
    }

    let inputSessionId = req.body.sessionId;
    let inputMessage = req.body.message;

    // Save user message in the database.
    let data = await MessageService.create(
        inputSessionId,
        'user',
        inputMessage
    );
    if (data.status === 'error') {
        return res.status(data.code).send(data);
    }

    // TODO: Caching with small expiry time can be added here against inputMessage.

    // Send message to WIT to get cities and intents.
    data = await WitService.process(inputMessage);
    if (data.status === 'error') {
        return res.status(data.code).send(data);
    }

    let intentMap = data.data.intents;
    let cities = data.data.cities;

    // Check! If no intents are found then add bot response and return message.
    if (intentMap.size === 0) {
        data = await MessageService.create(
            inputSessionId,
            'bot',
            'Sorry! I was not able to understand your intent.'
        );
        return res.status(data.code).send(data);
    }

    // Intent weather
    if (intentMap.has('get_weather')) {
        data = await IntentWeather.getWeather(inputSessionId, cities);
        return res.status(data.code).send(data);
    }
    // Intent greeting
    if (intentMap.has('greeting')) {
        data = await IntentGreeting.getGreeting(inputSessionId);
        return res.status(data.code).send(data);
    }

    data = BotService.createMessage(
        inputSessionId,
        'Sorry! I was not able to understand what you said.',
    );
    return res.status(data.code).send(data);
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
        message: 'Success! Listed messages.',
        data: messages
    });
}

module.exports = { create, list };
