import { SxProps } from '@mui/material';

export const styles: Record<string, SxProps> = {
  root: {
    width: '100%',
    height: '100%',
    pr: '20px',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    userSelect: 'none',
  },
  title: {
    fontSize: '18px',
    fontWeight: 300,
  },
  divider: {
    mt: '5px',
    borderColor: 'secondary.main',
  },
  content: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  value: {
    fontSize: '30px',
    fontWeight: 700,
  },
  trend: {
    display: 'flex',
    alignItems: 'center',
  },
  trendIcon: {
    mr: '5px',
  },
  skeleton: {
    width: 'calc(100% + 20px)',
    height: 'calc(100% + 20px)',
    position: 'absolute',
    borderRadius: 2,
    top: -10,
    left: -10,
    bottom: 0,
    right: 0,
  },
};
