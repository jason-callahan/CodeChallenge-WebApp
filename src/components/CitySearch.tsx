import React, { useState, useRef, useEffect } from 'react';
import {
    Box,
    TextField,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography,
    Paper,
    ClickAwayListener,
    InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { useCitySearch } from '@/libs/open-meteo/citySearch';
import type { CityResult } from '@/libs/open-meteo/citySearch';

interface CitySearchProps {
    onSelect: (city: CityResult) => void;
}

export const CitySearch: React.FC<CitySearchProps> = ({ onSelect }) => {
    const [query, setQuery] = useState('');
    const [open, setOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const [searchTrigger, setSearchTrigger] = useState('');
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    const { data, isLoading, error } = useCitySearch(searchTrigger);
    const results = data?.results ?? [];

    // Close dropdown on any edit
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        setOpen(false);
        setHighlightedIndex(-1);
    };

    const handleSearch = () => {
        if (!query.trim()) return;
        setSearchTrigger(query.trim());
        setOpen(true);
        setHighlightedIndex(-1);
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
            e.preventDefault();
            if (!open || highlightedIndex < 0) {
                handleSearch();
            } else {
                handleSelect(results[highlightedIndex]);
            }
        } else if (e.key === 'ArrowDown' && open) {
            e.preventDefault();
            setHighlightedIndex(prev =>
                prev + 1 < results.length ? prev + 1 : 0
            );
        } else if (e.key === 'ArrowUp' && open) {
            e.preventDefault();
            setHighlightedIndex(prev =>
                prev - 1 >= 0 ? prev - 1 : results.length - 1
            );
        } else if (e.key === 'Escape') {
            setOpen(false);
        }
    };

    // Scroll highlighted item into view
    useEffect(() => {
        if (highlightedIndex >= 0) {
            const el = itemRefs.current[highlightedIndex];
            if (el) el.scrollIntoView({ block: 'nearest' });
        }
    }, [highlightedIndex]);

    const handleClickAway = () => setOpen(false);

    return (
        <Box sx={{ minWidth: '40%', maxWidth: 600, mx: 'auto', position: 'relative' }}>
            <Box display="flex" gap={2} alignItems="center" color="primary">
                <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    label="City Search"
                    value={query}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    sx={{
                        backgroundColor: 'background.paper',
                        input: { color: 'text.primary' },
                    }}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon fontSize="small" />
                                </InputAdornment>
                            ),
                        },
                    }}
                />
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
                                    ref={el => {
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
