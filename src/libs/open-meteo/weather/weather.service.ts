import { fetchWeather } from './weather.api';
import type { CustomWeatherResponse } from './weather.types';

export const getCityWeather = async (lat: number, lon: number): Promise<CustomWeatherResponse> => {
    return fetchWeather(lat, lon);
};