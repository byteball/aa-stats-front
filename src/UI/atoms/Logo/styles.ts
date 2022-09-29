import { SxProps } from '@mui/material';

export const styles: Record<string, SxProps> = {
  root: {
    height: '100%',
    py: '10px',
    display: 'flex',
    alignItems: 'center',
    userSelect: 'none',
    borderRadius: 1,
  },
  logo: {
    minWidth: '46px',
    width: '46px',
    height: '46px',
    borderRadius: '50%',
    borderColor: 'primary.main',
    borderWidth: '3px',
    borderStyle: 'solid',
  },
  credits: {
    ml: '10px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: '18px',
    fontWeight: 700,
  },
  subtitle: {
    fontSize: { xs: '12px', sm: '14px' },
    fontWeight: 300,
    whiteSpace: 'nowrap',
  },
};
