// src/ThemeContext.tsx
import React, { createContext, useMemo, useState, useContext, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from './theme';

type ThemeMode = 'light' | 'dark';

const ThemeToggleContext = createContext({
    toggleTheme: () => { },
    mode: 'light' as ThemeMode,
});

export const useThemeToggle = () => useContext(ThemeToggleContext);

export const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [mode, setMode] = useState<ThemeMode>(() => {
        try {
            const storedMode = localStorage.getItem('appTheme') as ThemeMode;
            return storedMode === 'dark' ? 'dark' : 'light';
        } catch {
            return 'light';
        }
    });

    const theme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode]);

    useEffect(() => {
        localStorage.setItem('appTheme', mode);
    }, [mode]);

    const toggleTheme = () => {
        setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeToggleContext.Provider value={{ toggleTheme, mode }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeToggleContext.Provider>
    );
};
