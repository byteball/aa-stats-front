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
  head: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: '18px',
    fontWeight: 300,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  divider: {
    mt: '5px',
    borderColor: 'secondary.main',
  },
  content: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
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
  link: {
    width: '100%',
    height: '30.5px',
    alignItems: 'center',
    justifyContent: 'space-between',
    display: 'flex',
    gap: '5px',
    overflow: 'hidden',
    fontSize: 14,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  index: {
    minWidth: '16px',
    fontSize: 'inherit',
  },
  titleBox: {
    width: '100%',
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    justifyContent: 'space-between',
    gap: '5px',
  },
  addressTitle: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    fontSize: '13px',
  },
  asWrapper: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '10px',
  },
  value: {
    minWidth: '55px',
    ml: '5px',
  },
};
