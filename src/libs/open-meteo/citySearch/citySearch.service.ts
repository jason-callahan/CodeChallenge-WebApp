import { fetchCity } from './citySearch.api';
import type { CitySearchResponse } from './citySearch.types';

export const searchCity = async (city: string): Promise<CitySearchResponse> => {
    return fetchCity(city);
}