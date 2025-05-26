import { useQuery } from '@tanstack/react-query';
import { getCityWeather } from './weather.service';

export const useWeather = (lat: number, lon: number) =>
    useQuery({
        queryKey: ['weather', lat, lon],
        queryFn: () => getCityWeather(lat, lon),
        staleTime: 2 * 60 * 1000, // 2 minutes
        refetchInterval: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: true,
    });