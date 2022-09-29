import { SxProps } from '@mui/material';

export const styles: Record<string, SxProps> = {
  root: {
    cursor: 'pointer',
  },
  agent: {
    width: '260px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    overflow: 'hidden',
    mr: '5px',
  },
  title: {
    fontSize: '12px',
    letterSpacing: -0.2,
    lineHeight: 1.2,
    width: '100%',
    maxWidth: '100%',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  address: {
    width: '100%',
    maxWidth: '100%',
    fontSize: '10px',
    fontWeight: 300,
    opacity: 0.55,
    alignSelf: 'flex-start',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  cell: {
    width: { xs: '100px', sm: '150px' },
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  divider: {
    mx: '10px',
  },
  selected: {
    color: 'secondary.main',
  },
};
