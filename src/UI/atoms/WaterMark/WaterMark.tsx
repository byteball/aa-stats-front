import { FC, memo } from 'react';

import { Typography } from '@mui/material';

import { styles } from './styles';

const WaterMark: FC = () => <Typography sx={styles.root}>Obyte</Typography>;

export default memo(WaterMark);
