const axios = require('axios');
const config = require('../config/config.json');

async function process(message) {
    let witResponse = null;
    try {
        witResponse = await axios({
            method: 'get',
            url: config.wit_api_url + '/message?v=202008&q=' + message,
            headers: {
                "Authorization": "Bearer " + config.wit_api_access_token
            }
        });
        witResponse =  await witResponse.data;
    } catch (e) {
        console.log('Exception in fetching data from WIT.');
        console.log(e.message);
        return {
            status: 'error',
            message: "Something went wrong."
        }
    }

    // Map intents in a hashmap.
    let intents = new Map();
    for (let i in witResponse.intents) {
        intents.set(witResponse.intents[i].name, true);
    }

    // Cities
    let cities = [];
    if (witResponse.entities.hasOwnProperty('wit$location:location')) {
        for (let i in witResponse.entities['wit$location:location']) {
            cities.push(witResponse.entities['wit$location:location'][i].body);
        }
    }

    // Success.
    return {
        status: 'success',
        code: 200,
        message: '',
        data: { intents, cities }
    };
}

module.exports = {
    process
}
