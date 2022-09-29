import { SxProps } from '@mui/material';

export const styles: Record<string, SxProps> = {
  root: {
    height: { xs: 'calc(100% - 54px)', sm: 'calc(100% - 31px)' },
    position: 'relative',
  },
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    justifyContent: 'space-between',
    alignItems: { xs: 'flex-end', sm: 'center' },
    gap: { xs: '5px', sm: 'unset' },
  },
  headerLeft: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'flex-start',
    justifyContent: { xs: 'space-between', sm: 'flex-start' },
    '&>p': {
      mr: '10px',
    },
  },
  wrapper: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  title: {
    fontSize: '18px',
    flexGrow: { xs: 1, sm: 'unset' },
    fontWeight: 300,
    userSelect: 'none',
  },
  nodata: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  skeleton: {
    width: 'calc(100% + 20px)',
    height: { xs: 'calc(100% + 74px)', sm: 'calc(100% + 51px)' },
    position: 'absolute',
    top: -10,
    right: -10,
    bottom: -10,
    left: -10,
    borderRadius: 2,
  },
};
