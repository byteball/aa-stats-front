import { SxProps } from '@mui/material';

export const stylesByMode = (darkMode: boolean): Record<string, SxProps> => ({
  root: {
    boxShadow: 'none',
    bgcolor: 'background.default',
    minHeight: '64px',
    transition: 'box-shadow 250ms ease-in-out',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    pb: { xs: '10px', md: 'unset' },
  },
  header: {
    width: '100%',
    maxWidth: '1366px',
    display: 'flex',
    flexDirection: 'column',
  },
  headerLine: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    '&>*:not(:last-child)': {
      mr: '5px',
    },
  },
  shadow: {
    boxShadow: darkMode
      ? '8px 8px 16px #0e152e, -8px -8px 16px #141d3e'
      : '8px 8px 16px #cccfd4, -8px -8px 16px #ffffff',
  },
  search: {
    width: '320px',
  },
});
