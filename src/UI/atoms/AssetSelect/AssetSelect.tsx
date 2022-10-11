import { ChangeEventHandler, FC, useCallback, useState } from 'react';

import { Box, MenuItem, TextField, Typography } from '@mui/material';

import { coinIcon } from 'conf/constants';
import { useStateUrlParams } from 'lib/useStateUrlParams';
import { useAppDispatch, useAppSelector } from 'store';
import {
  assetSelector,
  assetsSelector,
  darkModeSelector,
  handleAsset,
} from 'store/UI';

import { styles } from './styles';

const AssetSelect: FC = () => {
  const dispatch = useAppDispatch();
  const asset = useAppSelector(assetSelector);
  const assets = useAppSelector(assetsSelector);
  const darkMode = useAppSelector(darkModeSelector);
  const [undefinedIcons, setUndefinedIcons] = useState<string[]>([]);

  const { setUrl } = useStateUrlParams();
  const onAssetChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = useCallback(
    (e) => {
      dispatch(handleAsset(e.target.value));
      setUrl({ asset: e.target.value });
    },
    [dispatch, setUrl]
  );

  const setUndefinedIconsBySymbol = useCallback(
    (symbol: string) => () => setUndefinedIcons((p) => p.concat(symbol)),
    []
  );
  const showCoinIcon = useCallback(
    (symbol: string) => !undefinedIcons.includes(symbol),
    [undefinedIcons]
  );
  return (
    <TextField
      SelectProps={{ MenuProps: { sx: styles.menu } }}
      autoComplete='off'
      color='secondary'
      size='medium'
      sx={styles.root}
      value={asset || 'null'}
      variant='standard'
      select
      onChange={onAssetChange}
    >
      <MenuItem value='all'>
        <Box sx={styles.item}>
          <Box sx={styles.icon} />
          <Typography sx={styles.label}>all assets</Typography>
        </Box>
      </MenuItem>
      {assets.map(({ assetId, assetSymbol }) => (
        <MenuItem key={assetId} value={assetSymbol}>
          <Box sx={styles.item}>
            <Box sx={styles.icon}>
              {showCoinIcon(assetSymbol) && (
                <img
                  alt=''
                  src={`${coinIcon}/${assetSymbol}${
                    darkMode ? '-INV' : ''
                  }.svg`}
                  onError={setUndefinedIconsBySymbol(assetSymbol)}
                />
              )}
            </Box>
            <Typography sx={styles.label}>{assetSymbol}</Typography>
          </Box>
        </MenuItem>
      ))}
    </TextField>
  );
};

export default AssetSelect;
