import React, { useEffect, useState } from 'react';
import { useWeather } from '../libs/open-meteo/weather/useWeather';
import type { CityResult } from '../libs/open-meteo/citySearch';
import './WeatherCard.scss';
import SunnyIcon from '../assets/weather-icons/sunny.svg';

interface WeatherCardProps {
    city: CityResult;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ city }) => {
    const { latitude, longitude, timezone, name } = city;
    const { data, isLoading, error } = useWeather(latitude, longitude);
    const [date, setDate] = useState(new Date());

    // ⏱️ Synced clock effect
    useEffect(() => {
        const sync = () => {
            const now = new Date();
            setDate(now);

            const delay = 1000 - now.getMilliseconds();

            const timeout = setTimeout(() => {
                setDate(new Date());

                const interval = setInterval(() => {
                    setDate(new Date());
                }, 1000);

                // Cleanup interval
                cleanupRef.current = () => clearInterval(interval);
            }, delay);

            // Cleanup timeout if needed
            cleanupRef.current = () => clearTimeout(timeout);
        };

        const cleanupRef = { current: () => { } };
        sync();
        return () => cleanupRef.current();
    }, []);

    const formatTime = (options: Intl.DateTimeFormatOptions) =>
        new Intl.DateTimeFormat('en-US', { ...options, timeZone: timezone }).format(date);

    const time = formatTime({ hour: '2-digit', minute: '2-digit', hour12: false });
    const seconds = new Intl.NumberFormat('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
    }).format(date.getSeconds());
    const weekday = formatTime({ weekday: 'short' });
    const ampmTime = formatTime({ hour: 'numeric', minute: '2-digit', hour12: true });

    const getOffsetFromLocalToTimezone = (timeZone: string): number => {
        const localDate = new Date();
        const zonedDate = new Date(localDate.toLocaleString('en-US', { timeZone, hour12: false }));
        const diffMs = zonedDate.getTime() - localDate.getTime();
        return Math.round(diffMs / 3_600_000);
    };

    const formatOffset = (offset: number): string => {
        if (offset === 0) return '';
        const sign = offset >= 0 ? '+' : '-';
        return `${sign}${Math.abs(offset)}h`;
    };

    const offsetHours = formatOffset(getOffsetFromLocalToTimezone(city?.timezone ?? 'UTC'));

    if (isLoading) return <div>Loading...</div>;
    if (error || !data) return <div>Error fetching weather.</div>;

    const current = data.current;
    const daily = data.daily;
    const todayIndex = 0;

    return (
        <div className="weather-card">
            <div className="weather-card__top">
                <img src={SunnyIcon} alt="weather icon" className="weather-card__icon" />
                <div>
                    H: {Math.round(daily.temperature_2m_max[todayIndex])}° - L: {Math.round(daily.temperature_2m_min[todayIndex])}°
                </div>
                <div className="weather-card__current-temp">
                    {Math.round(current.temperature_2m)}
                    {data.current_units.temperature_2m}
                </div>
            </div>

            <div className="weather-card__time">
                <span className="time-main">{time}</span>
                <span className="time-seconds">{seconds}</span>
            </div>

            <div className="weather-card__bottom">
                <div className="weather-card__city-row">
                    <div className="weather-card__city">
                        {name}
                        <span className="weather-card__offset">{offsetHours}</span>
                    </div>
                </div>
                <div className="weather-card__daytime">
                    <div className="day">{weekday}</div>
                    <div className="ampm">{ampmTime}</div>
                </div>
            </div>
        </div>
    );
};
