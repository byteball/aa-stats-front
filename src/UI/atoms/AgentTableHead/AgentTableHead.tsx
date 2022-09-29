import { FC, memo } from 'react';

import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { Box, IconButton, Typography } from '@mui/material';

import { styles } from './styles';

const columns: IAgentTableHeadConf[] = [
  { label: 'USD In', value: 'usd_amount_in', sort: true },
  { label: 'USD Out', value: 'usd_amount_out', sort: true },
  { label: 'TVL', value: 'usd_balance', sort: true },
];

const AgentTableHead: FC<IAgentTableHeadProps> = ({
  onChangeSortType,
  isSortSelected,
}) => (
  <Box sx={styles.root}>
    <Box sx={{ width: '260px' }} />
    {columns.map(({ label, value, sort }) => (
      <Box key={value} sx={styles.column}>
        <Typography sx={styles.label}>{label}</Typography>
        {sort && (
          <IconButton
            color={isSortSelected(value) ? 'success' : 'default'}
            size='small'
            onClick={onChangeSortType(value)}
          >
            <KeyboardArrowDownRoundedIcon fontSize='inherit' />
          </IconButton>
        )}
      </Box>
    ))}
  </Box>
);

export default memo(AgentTableHead);
