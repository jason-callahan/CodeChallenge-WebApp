
export type CityResult = {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    elevation: number;
    feature_code: string;
    country_code: string;
    timezone: string;
    population: number;
    postcodes?: string[];
    country_id: number;
    country: string;
    admin1: string;
    admin2: string;
};

export type CitySearchResponse = {
    results: CityResult[];
    generationtime_ms: number;
};

