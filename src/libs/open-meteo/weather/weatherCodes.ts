// weatherCodes.js

// Individual code constants
export const CLEAR_SKY = 0;
export const MAINLY_CLEAR = 1;
export const PARTLY_CLOUDY = 2;
export const OVERCAST = 3;
export const FOG = 45;
export const DEPOSITING_RIME_FOG = 48;
export const DRIZZLE_LIGHT = 51;
export const DRIZZLE_MODERATE = 53;
export const DRIZZLE_DENSE = 55;
export const FREEZING_DRIZZLE_LIGHT = 56;
export const FREEZING_DRIZZLE_DENSE = 57;
export const RAIN_SLIGHT = 61;
export const RAIN_MODERATE = 63;
export const RAIN_HEAVY = 65;
export const FREEZING_RAIN_LIGHT = 66;
export const FREEZING_RAIN_HEAVY = 67;
export const SNOW_FALL_SLIGHT = 71;
export const SNOW_FALL_MODERATE = 73;
export const SNOW_FALL_HEAVY = 75;
export const SNOW_GRAINS = 77;
export const RAIN_SHOWERS_SLIGHT = 80;
export const RAIN_SHOWERS_MODERATE = 81;
export const RAIN_SHOWERS_VIOLENT = 82;
export const SNOW_SHOWERS_SLIGHT = 85;
export const SNOW_SHOWERS_HEAVY = 86;
export const THUNDERSTORM = 95;
export const THUNDERSTORM_SLIGHT_HAIL = 96;
export const THUNDERSTORM_HEAVY_HAIL = 99;

// Mapping from code to human-readable description
export const WEATHER_CODE_DESCRIPTIONS = {
    [CLEAR_SKY]: 'Clear sky',
    [MAINLY_CLEAR]: 'Mainly clear',
    [PARTLY_CLOUDY]: 'Partly cloudy',
    [OVERCAST]: 'Overcast',
    [FOG]: 'Fog',
    [DEPOSITING_RIME_FOG]: 'Depositing rime fog',
    [DRIZZLE_LIGHT]: 'Drizzle: Light intensity',
    [DRIZZLE_MODERATE]: 'Drizzle: Moderate intensity',
    [DRIZZLE_DENSE]: 'Drizzle: Dense intensity',
    [FREEZING_DRIZZLE_LIGHT]: 'Freezing drizzle: Light intensity',
    [FREEZING_DRIZZLE_DENSE]: 'Freezing drizzle: Dense intensity',
    [RAIN_SLIGHT]: 'Rain: Slight intensity',
    [RAIN_MODERATE]: 'Rain: Moderate intensity',
    [RAIN_HEAVY]: 'Rain: Heavy intensity',
    [FREEZING_RAIN_LIGHT]: 'Freezing rain: Light intensity',
    [FREEZING_RAIN_HEAVY]: 'Freezing rain: Heavy intensity',
    [SNOW_FALL_SLIGHT]: 'Snow fall: Slight intensity',
    [SNOW_FALL_MODERATE]: 'Snow fall: Moderate intensity',
    [SNOW_FALL_HEAVY]: 'Snow fall: Heavy intensity',
    [SNOW_GRAINS]: 'Snow grains',
    [RAIN_SHOWERS_SLIGHT]: 'Rain showers: Slight intensity',
    [RAIN_SHOWERS_MODERATE]: 'Rain showers: Moderate intensity',
    [RAIN_SHOWERS_VIOLENT]: 'Rain showers: Violent intensity',
    [SNOW_SHOWERS_SLIGHT]: 'Snow showers: Slight intensity',
    [SNOW_SHOWERS_HEAVY]: 'Snow showers: Heavy intensity',
    [THUNDERSTORM]: 'Thunderstorm: Slight or moderate',
    [THUNDERSTORM_SLIGHT_HAIL]: 'Thunderstorm with slight hail',
    [THUNDERSTORM_HEAVY_HAIL]: 'Thunderstorm with heavy hail',
};
