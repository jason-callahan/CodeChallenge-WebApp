import axios from "axios";
import type { CitySearchResponse } from "./citySearch.types";

const BASE_URL = "https://geocoding-api.open-meteo.com/v1/search";

export const fetchCity = async (city: string): Promise<CitySearchResponse> => {
    const response = await axios.get(
        `${BASE_URL}?name=${city}`
    );
    return response.data;
};