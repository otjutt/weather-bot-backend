const MessageService = require('../service/message-service');

async function getGreeting(
    sessionId,
) {
    let messages = [
        'Hi! How are you?',
        'What\'s up?',
        'Hey!',
        'Hi! Let\'s have some chat.'
    ];
    let randomNumber = randomIntFromInterval(0, messages.length);
    return MessageService.create(
        sessionId,
        'bot',
        messages[randomNumber]
    );
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports = {
    getGreeting
}
