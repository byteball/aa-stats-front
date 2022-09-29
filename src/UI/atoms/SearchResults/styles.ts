import { SxProps } from '@mui/material';

export const styles: Record<string, SxProps> = {
  root: {
    width: '100%',
    position: 'absolute',
  },
  menu: {
    maxHeight: '370px',
    overflowY: 'auto',
    width: '100%',
    overflowX: 'hidden',
    borderRadius: 1,
    bgcolor: 'background.paper',
    scrollBehavior: 'smooth',
  },
  searchedItem: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
    gap: '5px',
  },
  creds: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  labelText: {
    width: '100%',
    fontSize: '12px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  addressText: {
    width: '100%',
    fontSize: '10px',
    fontWeight: 300,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  tvl: {
    fontSize: '10px',
    color: 'secondary.dark',
  },
  goToLabel: {
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontSize: { xs: 'unset', md: '10px' },
  },
  nofound: {
    p: '8px 16px',
    fontSize: { xs: 'unset', md: '12px' },
  },
};
