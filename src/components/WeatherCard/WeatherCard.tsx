import React, { useEffect, useState } from 'react';
import { useWeather } from '../../libs/open-meteo/weather/useWeather';
import type { CityResult } from '../../libs/open-meteo/citySearch';
import { useThemeToggle } from '@/theme';
import { WEATHER_CODE_ICONS } from './weatherIcons';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Typography, Box, IconButton, Menu, MenuItem, Paper } from '@mui/material';
import './WeatherCard.scss';

interface WeatherCardProps {
    city: CityResult;
    onRemove: (city: CityResult) => void;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ city, onRemove }) => {
    const { latitude, longitude, timezone, name } = city;
    const { data, isLoading, error } = useWeather(latitude, longitude);
    const [date, setDate] = useState(new Date());
    const { mode } = useThemeToggle();

    // Menu state
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl);
    const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);
    const handleDelete = () => {
        handleMenuClose();
        onRemove(city);
    };

    // Synced clock effect
    useEffect(() => {
        const cleanupRef = { current: () => { } };
        const sync = () => {
            const now = new Date();
            setDate(now);
            const delay = 1000 - now.getMilliseconds();

            const timeout = setTimeout(() => {
                setDate(new Date());
                const interval = setInterval(() => setDate(new Date()), 1000);
                cleanupRef.current = () => clearInterval(interval);
            }, delay);

            cleanupRef.current = () => clearTimeout(timeout);
        };
        sync();
        return () => cleanupRef.current();
    }, []);

    const formatTime = (options: Intl.DateTimeFormatOptions) =>
        new Intl.DateTimeFormat('en-US', { ...options, timeZone: timezone }).format(date);

    const time = formatTime({ hour: '2-digit', minute: '2-digit', hour12: false });
    const seconds = new Intl.NumberFormat('en-US', { minimumIntegerDigits: 2, useGrouping: false }).format(
        date.getSeconds()
    );
    const weekday = formatTime({ weekday: 'short' });
    const ampmTime = formatTime({ hour: 'numeric', minute: '2-digit', hour12: true });

    const getOffsetFromLocalToTimezone = (timeZone: string): number => {
        const localDate = new Date();
        const zonedDate = new Date(
            localDate.toLocaleString('en-US', { timeZone, hour12: false })
        );
        const diffMs = zonedDate.getTime() - localDate.getTime();
        return Math.round(diffMs / 3_600_000);
    };

    const formatOffset = (offset: number): string => {
        if (offset === 0) return '';
        const sign = offset >= 0 ? '+' : '-';
        return `${sign}${Math.abs(offset)}h`;
    };

    const offsetHours = formatOffset(getOffsetFromLocalToTimezone(city.timezone || 'UTC'));

    if (isLoading) return <div>Loading...</div>;
    if (error || !data) return <div>Error fetching weather.</div>;

    const current = data.current;
    const daily = data.daily;
    const todayIndex = 0;

    // Determine icon component for current weather code
    const CodeIcon =
        WEATHER_CODE_ICONS[current.weathercode] ||
        (WEATHER_CODE_ICONS[0] as React.ElementType);

    return (
        <Paper className={`weather-card theme-${mode}`} elevation={3}>
            <div className="weather-card__top">
                <CodeIcon fontSize="large" className="weather-card__icon" color="primary" />

                <div className='weather-card__range-wrapper'>
                    <Typography className="weather-card__range" color="primary">
                        {Math.round(daily.temperature_2m_min[todayIndex])}
                    </Typography>

                    <div className="weather-card__current-temp">
                        {Math.round(current.temperature_2m)}°
                        {/* {data.current_units.temperature_2m} */}
                    </div>

                    <Typography className="weather-card__range" color="primary">
                        {Math.round(daily.temperature_2m_max[todayIndex])}
                    </Typography>
                </div>

                <Box>
                    <IconButton
                        className="weather-card__menu-btn"
                        size="small"
                        onClick={handleMenuOpen}
                    >
                        <MoreVertIcon fontSize="small" />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={openMenu}
                        onClose={handleMenuClose}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    >
                        <MenuItem onClick={handleDelete}>Delete</MenuItem>
                    </Menu>
                </Box>
            </div>

            <div className="weather-card__time">
                <span className="time-main">{time}</span>
                <span className="time-seconds">:{seconds}</span>
            </div>

            <div className="weather-card__bottom">
                <Box className="weather-card__city-row">
                    <Box className="weather-card__city">
                        <Typography
                            component="span"
                            color="warning"               // ← this will pick up warning.main
                            className="weather-card__name"
                        >
                            {name}
                        </Typography>
                        <Typography
                            component="span"
                            color="primary"
                            className="weather-card__offset"
                        >
                            {offsetHours}
                        </Typography>
                    </Box>
                </Box>
                <div className="weather-card__daytime">
                    <Typography className="day" color='primary'>{weekday}</Typography>
                    <div className="ampm">{ampmTime}</div>
                </div>
            </div>
        </Paper>
    );
};
