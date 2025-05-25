// src/libs/open-meteo/weatherIcons.tsx
import React from 'react';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import WbCloudyIcon from '@mui/icons-material/WbCloudy';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import FilterDramaIcon from '@mui/icons-material/FilterDrama';
import OpacityIcon from '@mui/icons-material/Opacity';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import GrainIcon from '@mui/icons-material/Grain';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';

// Map of weather code → corresponding MUI icon component
export const WEATHER_CODE_ICONS: Record<number, React.ElementType> = {
    // Clear
    0: WbSunnyIcon,          // clear sky
    1: WbSunnyOutlinedIcon,  // mainly clear
    2: WbCloudyIcon,         // partly cloudy
    3: CloudQueueIcon,       // overcast

    // Fog
    45: FilterDramaIcon,
    48: FilterDramaIcon,

    // Drizzle
    51: OpacityIcon,
    53: OpacityIcon,
    55: OpacityIcon,
    56: OpacityIcon,
    57: OpacityIcon,

    // Rain
    61: WaterDropIcon,
    63: WaterDropIcon,
    65: WaterDropIcon,
    66: WaterDropIcon,
    67: WaterDropIcon,

    // Snow
    71: AcUnitIcon,
    73: AcUnitIcon,
    75: AcUnitIcon,
    77: GrainIcon,

    // Showers
    80: OpacityIcon,
    81: OpacityIcon,
    82: OpacityIcon,

    // Snow showers
    85: AcUnitIcon,
    86: AcUnitIcon,

    // Thunderstorms
    95: ThunderstormIcon,
    96: FlashOnIcon,
    99: FlashOnIcon,
};
