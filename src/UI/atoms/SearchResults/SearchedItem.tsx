import { FC, memo, useMemo } from 'react';

import { Box, MenuItem, Typography } from '@mui/material';

import { usd } from 'lib/currency';
import { HighlightText } from 'lib/HighLightText';

import { styles } from './styles';

const SearchedItem: FC<ISearchedItemProps> = ({
  label,
  searchText,
  address,
  onClick,
  index,
  arrLength,
  tvl,
  autoFocus,
}) => {
  const focus = useMemo(
    () =>
      (autoFocus === 'up' && index === arrLength - 1) ||
      (autoFocus === 'down' && index === 0),
    [arrLength, autoFocus, index]
  );
  const isLabel = useMemo(() => label !== address, [address, label]);
  return (
    <MenuItem autoFocus={focus} sx={styles.searchedItem} onClick={onClick}>
      <Box sx={styles.creds}>
        <Typography sx={styles.labelText}>
          <HighlightText highlight={searchText} text={label} />
        </Typography>
        {isLabel && (
          <Typography sx={styles.addressText}>
            <HighlightText highlight={searchText} text={address} />
          </Typography>
        )}
      </Box>
      {tvl != null && (
        <Typography sx={styles.tvl}>TVL: {usd(tvl, 0, true)}</Typography>
      )}
    </MenuItem>
  );
};

export default memo(SearchedItem);
