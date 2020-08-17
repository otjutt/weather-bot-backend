const { Message } = require('../models/index');

async function createMessage(
    sessionId,
    message
) {
    try {
        let botMessage = await Message
            .create({
                sessionId,
                author: 'bot',
                message
            })
        return { status: 'success', code: 201, message: 'Success!', data: botMessage};
    } catch (e) {
        console.log('Error! Failed to create bot message.');
        console.log(e.message);
        return { status: 'error', code: 400, message: 'Error! Something went wrong.', data: null };
    }
}

module.exports = {
    createMessage
}
