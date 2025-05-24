import { useQuery } from '@tanstack/react-query';
import { searchCity } from './citySearch.service';

export const useCitySearch = (city: string) => {
    const isEnabled = !!city.trim();
    console.log('useCitySearch', city, isEnabled);
    return useQuery({
        queryKey: ['city', city.toLowerCase()],
        queryFn: () => searchCity(city),
        enabled: isEnabled,
        staleTime: 30 * 24 * 60 * 60 * 1000, // 30 days
    });
};