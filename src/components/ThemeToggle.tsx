// src/components/ThemeToggleButton.tsx
import React from 'react';
import { IconButton } from '@mui/material';
import { LightMode, ModeNight } from '@mui/icons-material';
import { useThemeToggle } from '@/theme';
import { useTheme } from '@mui/material/styles';

export const ThemeToggleButton = () => {
    const { toggleTheme } = useThemeToggle();
    const theme = useTheme();

    return (
        <IconButton onClick={toggleTheme} color="inherit">
            {theme.palette.mode === 'dark' ? <LightMode /> : <ModeNight />}
        </IconButton>
    );
};

