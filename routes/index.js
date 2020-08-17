const {
    session,
    message
} = require('../controllers');

module.exports = (app) => {
    // Session
    app.post('/api/v1/sessions/:id', session.update);
    app.get('/api/v1/sessions/:id', session.read);
    app.post('/api/v1/sessions', session.create);
    app.get('/api/v1/sessions', session.list);

    // Message
    app.post('/api/v1/messages', message.create);
    app.get('/api/v1/messages', message.list);
};
