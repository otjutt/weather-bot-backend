const OpenWeatherService = require('../service/open-weather-service');
const MessageService = require('../service/message-service');

async function getWeather(
    sessionId,
    cities,
) {
    // Check! If no city is found then throw an error.
    if (cities.length === 0) {
        return MessageService.create(
            sessionId,
            'bot',
            'Sorry! I did not understand your city.'
        );
    }

    // START - weather API
    let location = cities[0];

    // TODO: Caching with small expiry time can be added here against location.

    let responseWeather = await OpenWeatherService.getTemperatureDetails(location);
    if (responseWeather.status === 'success') {
        responseWeather = responseWeather.data;
    } else {
        return { status: 'error', code: 400, message: 'Error! Something went wrong.', data: null };
    }

    if (responseWeather === null ||
        typeof responseWeather === 'undefined' ||
        typeof responseWeather.main.temp === 'undefined'
    ) {
        return MessageService.create(
            sessionId,
            'bot',
            'Sorry! I could not find temperate of your city.'
        );
    }
    // END - weather API

    try {
        return MessageService.create(
            sessionId,
            'bot',
            location + ' temperature is ' + responseWeather.main.temp + ' Celcius.'
        );
    } catch (e) {
        console.log('Exception in saving bot message for successful response.');
        console.log(e.message);
        return { status: 'error', code: 400, message: 'Error! Something went wrong.', data: null };
    }
}

module.exports = {
    getWeather
}
