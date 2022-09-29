import { FC, memo } from 'react';

import { Fade, MenuItem, MenuList, Paper, Typography } from '@mui/material';
import { v4 } from 'uuid';

import SearchedItem from './SearchedItem';
import { styles } from './styles';

const SearchResults: FC<ISearchResultsProps> = ({
  open,
  data,
  onAddressClick,
  searchText,
  autoFocus,
  onKeyDown,
}) => (
  <Fade in={open}>
    <Paper sx={styles.root}>
      <MenuList sx={styles.menu} onKeyDown={onKeyDown}>
        {searchText.length === 32 && data.length === 0 && (
          <MenuItem autoFocus onClick={onAddressClick(searchText)}>
            <Typography
              sx={styles.goToLabel}
            >{`Go to ${searchText}`}</Typography>
          </MenuItem>
        )}
        {data.map(({ address, label, tvl }, index, arr) => (
          <SearchedItem
            key={v4()}
            address={address}
            arrLength={arr.length}
            autoFocus={autoFocus}
            index={index}
            label={label}
            searchText={searchText}
            tvl={tvl}
            onClick={onAddressClick(address)}
          />
        ))}
        {data.length === 0 && searchText.length !== 32 && (
          <Typography sx={styles.nofound} variant='body2'>
            Nothing found
          </Typography>
        )}
      </MenuList>
    </Paper>
  </Fade>
);

export default memo(SearchResults);
