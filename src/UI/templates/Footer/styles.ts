import { SxProps } from '@mui/material';

export const styles: Record<string, SxProps> = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '64px',
    py: '15px',
    gap: '15px',
  },
  copyright: {
    fontSize: '12px',
    fontWeight: 300,
    userSelect: 'none',
  },
  link: {
    textDecoration: 'none',
  },
};
