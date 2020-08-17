const { Message } = require('../models/index');

async function create(
    sessionId,
    author,
    messageText
) {
    try {
        let message = await Message
            .create({
                sessionId: sessionId,
                author: author,
                message: messageText
            });
        return { status: 'success', code: 201, message: 'Success!', data: message};
    } catch (e) {
        console.log('Error! Failed to create message.');
        console.log(e.message);
        return { status: 'error', code: 400, message: 'Error! Something went wrong.', data: null };
    }
}

module.exports = {
    create
}
