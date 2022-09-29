import { createTheme, Theme } from '@mui/material';

export const theme = (darkMode: boolean): Theme =>
  createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1366,
        xl: 1920,
      },
    },
    typography: {
      fontFamily: [
        'Poppins',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      button: {
        textTransform: 'none',
        whiteSpace: 'nowrap',
      },
    },
    palette: darkMode
      ? {
          mode: 'dark',
          common: {
            black: '#fff',
            white: '#252527',
          },
          success: {
            main: '#00fa9a',
          },
          error: {
            main: '#d9275c',
          },
          primary: {
            dark: '#fff',
            main: '#fff',
            light: 'rgba(225,225,225,.2)',
            contrastText: '#2b2e5c',
          },
          secondary: {
            dark: '#ff8c6f',
            main: '#ffa16f',
            light: '#fff1cc',
            contrastText: '#fff',
          },
          background: {
            paper: '#1a223f',
            default: '#252850',
          },
          text: {
            primary: '#fff',
            secondary: '#fff',
          },
        }
      : {
          mode: 'light',
          common: {
            black: 'rgba(0,0,0,.6)',
            white: '#fff',
          },
          success: {
            main: '#00c77b',
          },
          error: {
            main: '#d5265b',
          },
          primary: {
            dark: '#1d1e33',
            main: '#2c3e50',
            light: '#d8e5f0',
            contrastText: '#fff',
          },
          secondary: {
            dark: '#ff8c6f',
            main: '#ffa16f',
            light: '#fff1cc',
            contrastText: '#fff',
          },
          background: {
            paper: '#e0eeff',
            default: '#f0f4f9',
          },
          text: {
            primary: 'rgba(0,0,0,.6)',
            secondary: '#456c91',
          },
        },
    shape: {
      borderRadius: 5,
    },
    shadows: [
      'none',
      'none',
      '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
      '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
      '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
      '0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)',
      '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',
      '0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)',
      '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
      '0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)',
      '0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)',
      '0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)',
      '0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)',
      '0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)',
      '0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)',
      '0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)',
      '0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)',
      '0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)',
      '0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)',
      '0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)',
      '0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)',
      '0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)',
      '0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)',
      '0px 25px 50px 0px rgba(30,136,229,0.1)',
      '0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px',
    ],
    components: {
      MuiInputBase: {
        styleOverrides: {
          inputSizeSmall: {
            padding: 0,
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            color: '#fff',
          },
        },
      },
      MuiList: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? '#252850' : '#fff',
          },
        },
      },
      MuiListItemText: {
        styleOverrides: {
          root: {
            width: '200px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          },
          primary: {
            fontSize: '13px',
            letterSpacing: -0.1,
            lineHeight: 1.2,
            width: '100%',
            maxWidth: '100%',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          },
          secondary: {
            fontSize: '10px',
            fontWeight: 300,
          },
        },
      },
      // MuiPopover: {
      //   styleOverrides: {
      //     root: {
      //       top: 0,
      //       position: 'absolute',
      //     },
      //   },
      // },
      MuiCssBaseline: {
        styleOverrides: {
          '::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '::-webkit-scrollbar-thumb': {
            backgroundColor: '#e9e9e9',
            borderRadius: '8px',
          },
          html: {
            width: '100%',
            height: '100%',
            WebkitFontSmoothing: 'auto',
          },
          body: {
            width: '100%',
            height: '100%',
            transition: 'background-color 250ms',
            overflowX: 'hidden',
          },
          img: {
            pointerEvents: 'none',
            userSelect: 'none',
          },
          '#root': {
            width: '100%',
            minWidth: '320px',
            minHeight: '100%',
            display: 'flex',
            flexDirection: 'column',
          },
        },
      },
    },
  });
