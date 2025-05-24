import { useQuery } from '@tanstack/react-query';
import { getCityWeather } from './weather.service';

export const useWeather = (lat: number, lon: number) =>
    useQuery({
        queryKey: ['weather', lat, lon],
        queryFn: () => getCityWeather(lat, lon),
        staleTime: 1 * 60 * 1000, // 5 minutes
        refetchInterval: 2 * 60 * 1000, // 10 minutes
        refetchOnWindowFocus: true,
    });