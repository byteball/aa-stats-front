import { SxProps } from '@mui/material';

export const styles: Record<string, SxProps> = {
  root: {
    width: '100%',
    height: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '5px',
  },
  headerTop: {
    width: '100%',
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    justifyContent: 'space-between',
    alignItems: { xs: 'flex-end', sm: 'center' },
    gap: '5px',
  },
  wrapper: {
    width: '100%',
    height: {
      xs: 'calc(100% - 81px)',
      sm: 'calc(100% - 59px)',
    },
    position: 'relative',
    py: '5px',
  },
  title: {
    fontSize: '18px',
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
    height: 'calc(100% + 20px)',
    position: 'absolute',
    top: -10,
    right: -10,
    bottom: -10,
    left: -10,
    borderRadius: 2,
  },
  footer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    pr: '10px',
  },
};
