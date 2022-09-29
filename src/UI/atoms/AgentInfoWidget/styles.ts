import { SxProps } from '@mui/material';

export const styles: Record<string, SxProps> = {
  root: {
    width: '100%',
    height: '72px',
    p: { xs: '5px 16px 0px', sm: '10px 24px 5px' },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '10px',
  },
  titleBox: {
    display: 'flex',
    flexDirection: 'column',
    // paddingRight: '10px',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  title: {
    fontSize: { xs: '18px', md: '24px' },
    fontWeight: { xs: 500, md: 700 },
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  subtitle: {
    fontSize: { xs: '12px', md: '14px' },
    fontWeight: 300,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  linksWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: { xs: '5px', md: '15px' },
  },
  link: {
    display: 'flex',
    gap: '5px',
  },
  linkText: {
    display: { xs: 'none', md: 'unset' },
  },
};
