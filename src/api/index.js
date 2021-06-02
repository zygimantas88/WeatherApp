import axios from 'axios';
import {
    timeStampToWeekDay,
    timeStampToHoursMinutes
} from '../utils/dateHelpers'

const weatherApiKey = 'c49f69a456e00e9120d4fc9e5fe67c52';
const weatherApi = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/',
    headers: { 'Content-Type': 'application/jason' }
});
//https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

const locationApiKey = '62f13f1dd355442c98bd677d882adad1';
const locationApi = axios.create({
    baseURL: 'https://api.opencagedata.com/geocode/v1/',
    headers: { 'Content-Type': 'application/jason' }
});
//https://api.opencagedata.com/geocode/v1/json?q=PLACENAME&key=62f13f1dd355442c98bd677d882adad1



export const getDailyWeatherByCityCountry = async ({ city, country }, success, failure) => {
    try {
      const { data: locData } = await locationApi.get(`json?q=${country}, ${city}&key=${locationApiKey}`);
      const { lat, lng } = locData.results[0].geometry;
      const { data: weatherData } = await weatherApi.get(`onecall?lat=${lat}&lon=${lng}&units=metric&exclude=hourly,alerts,current,minutely&appid=${weatherApiKey}`);
      const formatedDays = weatherData.daily.map(({ temp, clouds, dt, sunrise, sunset, wind_deg, wind_speed }) => ({
        temp: temp.day,
        cloudPercentage: clouds,
        weekDay: timeStampToWeekDay(dt),
        sunrise: timeStampToHoursMinutes(sunrise),
        sunset: timeStampToHoursMinutes(sunset),
        windDeg: wind_deg,
        windSpeed: wind_speed
      }));
      success(formatedDays)
    } catch (error) {
      failure(error);
    }
  }

  const api = {
    getDailyWeatherByCityCountry
  }

  export default api;
  