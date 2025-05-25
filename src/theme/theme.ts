import { createTheme } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material/styles';

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#03a9f4',
        },
        secondary: {
            main: 'rgba(0, 0, 0, 0.7)',
        },
        warning: {
            main: "rgb(24,112,201)",
        },
        background: {
            default: '#eee',
            paper: '#efefef',
        },
    },
} as ThemeOptions);

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: 'rgb(144,202,249)',
        },
        secondary: {
            main: '#ce93d8',
        },
        warning: {
            main: "#D56748",
        },
        background: {
            default: '#002130',
            paper: '#002130',
        },
    },
} as ThemeOptions);