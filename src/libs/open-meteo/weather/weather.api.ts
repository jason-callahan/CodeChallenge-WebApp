import axios from "axios";
import type { CustomWeatherResponse } from "./weather.types";

const BASE_URL = "https://api.open-meteo.com/v1/forecast";

export const fetchWeather = async (
    lat: number,
    lon: number
): Promise<CustomWeatherResponse> => {
    const response = await axios.get(BASE_URL, {
        params: {
            latitude: lat,
            longitude: lon,
            current: "temperature_2m,weathercode",
            daily: "temperature_2m_max,temperature_2m_min",
            temperature_unit: "fahrenheit",
            timezone: "auto",
        },
    });
    return response.data;
};