import React, { useState, useRef, useEffect } from 'react';
import {
    Box,
    TextField,
    Button,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography,
    Paper,
    ClickAwayListener,
} from '@mui/material';

import { useCitySearch } from '@/libs/open-meteo/citySearch';
import type { CityResult } from '@/libs/open-meteo/citySearch';

interface CitySearchProps {
    onSelect: (city: CityResult) => void;
}

export const CitySearch: React.FC<CitySearchProps> = ({ onSelect }) => {
    const [query, setQuery] = useState('');
    const [open, setOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const [searchTrigger, setSearchTrigger] = useState("");
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    const { data, isLoading, error } = useCitySearch(searchTrigger);
    const results = data?.results ?? [];

    const handleSearch = () => {
        if (query.trim()) {
            setSearchTrigger(query.trim());
            setOpen(true);
            setHighlightedIndex(0);
        }
    };

    const handleSelect = (city: CityResult) => {
        setQuery('');
        setSearchTrigger('');
        setOpen(false);
        setHighlightedIndex(-1);
        onSelect(city);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            if (!open) {
                handleSearch();
            } else if (highlightedIndex >= 0 && highlightedIndex < results.length) {
                e.preventDefault();
                handleSelect(results[highlightedIndex]);
            }
        } else if (e.key === 'ArrowDown' && open) {
            e.preventDefault();
            setHighlightedIndex((prev) => (prev + 1) % results.length);
        } else if (e.key === 'ArrowUp' && open) {
            e.preventDefault();
            setHighlightedIndex((prev) => (prev - 1 + results.length) % results.length);
        } else if (e.key === 'Escape') {
            setOpen(false);
        }
    };

    useEffect(() => {
        const el = itemRefs.current[highlightedIndex];
        if (el) {
            el.scrollIntoView({ block: 'nearest' });
        }
    }, [highlightedIndex]);

    useEffect(() => {
        if (results.length > 0) {
            setHighlightedIndex(0);
        }
    }, [results]);

    const handleClickAway = () => setOpen(false);

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', position: 'relative' }}>
            <Box display="flex" gap={2} mb={2}>
                <TextField
                    fullWidth
                    label="Search City"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    sx={{
                        backgroundColor: 'background.paper',
                        input: { color: 'text.primary' },
                    }}
                />
                <Button variant="contained" onClick={handleSearch} disabled={isLoading}>
                    Search
                </Button>
            </Box>

            <ClickAwayListener onClickAway={handleClickAway}>
                <Paper
                    elevation={3}
                    sx={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        mt: 1,
                        maxHeight: 300,
                        overflowY: 'auto',
                        zIndex: 10,
                        display: open && results.length > 0 ? 'block' : 'none',
                    }}
                >
                    <List>
                        {results.map((city, idx) => (
                            <ListItem key={city.id ?? idx} disablePadding>
                                <ListItemButton
                                    ref={(el) => {
                                        itemRefs.current[idx] = el;
                                    }}
                                    selected={idx === highlightedIndex}
                                    onClick={() => handleSelect(city)}
                                >
                                    <ListItemText
                                        primary={`${city.name}, ${city.admin1}`}
                                        secondary={city.country}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </ClickAwayListener>

            {searchTrigger && !isLoading && results.length === 0 && open && (
                <Typography variant="body2" color="text.secondary" mt={2}>
                    No results found.
                </Typography>
            )}

            {error && (
                <Typography variant="body2" color="error" mt={2}>
                    Something went wrong.
                </Typography>
            )}
        </Box>
    );
};
