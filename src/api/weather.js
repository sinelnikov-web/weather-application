import {WeatherApi} from "./api";

export class Weather {
    static async getWeather(city) {
        try {
            const response = await WeatherApi.get(`weather?q=${city}`)
            return Promise.resolve(response.data)
        } catch (err) {
            return Promise.reject(err)
        }
    }
}