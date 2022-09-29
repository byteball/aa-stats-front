import { FC, memo } from 'react';

import { Box, Link, Typography } from '@mui/material';

// import { useAppDispatch } from 'store';
// import { useGetTopAAbyTvlQuery } from 'store/AAstats';
// import { obyteApi } from 'store/Obyte';
import SocialBlock from 'UI/atoms/SocialBlock/SocialBlock';

import { styles } from './styles';

const Footer: FC = () => (
  // const dispatch = useAppDispatch();
  // const { data: fullData } = useGetTopAAbyTvlQuery({});
  // useEffect(() => {
  //   if (fullData) dispatch(obyteApi.util.prefetch('getDefinitions', fullData, {}));
  // }, [dispatch, fullData]);
  <Box component='footer' sx={styles.root}>
    <SocialBlock />
    <Box>
      <Typography sx={styles.copyright}>
        © 2022{' '}
        <Link href='https://obyte.org/' sx={styles.link} target='_blank'>
          Obyte.
        </Link>{' '}
        All Rights Reserved
      </Typography>
    </Box>
  </Box>
);
export default memo(Footer);
