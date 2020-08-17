const axios = require('axios');
const config = require('../config/config.json');

async function getTemperatureDetails(location) {
    let url = config.open_weather_api_url + '/data/2.5/weather?units=metric&q='+ location
        + '&appid=' + config.open_weather_api_key;
    let responseWeather = null;
    try {
        responseWeather = await axios({
            method: 'get',
            url: url
        });
        let data =  await responseWeather.data;
        return {
            status: 'success',
            data: data
        }
    } catch (e) {
        console.log('Exception in fetching data from open weather.');
        console.log(e.message);
        return {
            status: 'error',
            message: "Something went wrong."
        }
    }
}

module.exports = {
    getTemperatureDetails
};
