import { ChangeEventHandler, FC, memo, useCallback } from 'react';

import { Box, MenuItem, TextField, Typography } from '@mui/material';

import { coinIcon } from 'conf/constants';
import { assetsIconsConf } from 'conf/uiControls';
import { useStateUrlParams } from 'lib/useStateUrlParams';
import { useAppDispatch, useAppSelector } from 'store';
import { assetSelector, assetsSelector, handleAsset } from 'store/UI';

import { styles } from './styles';

const AssetSelect: FC = () => {
  const dispatch = useAppDispatch();
  const asset = useAppSelector(assetSelector);
  const assets = useAppSelector(assetsSelector);
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

  const getAssetIcon = useCallback(
    (assetValue: string) =>
      assetsIconsConf.find((aic) => aic.assets.some((a) => a === assetValue))
        ?.icon || null,
    []
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
      {/* <MenuItem value='GBYTE'>
        <Box sx={styles.item}>
          <Box sx={styles.icon}>
            <img src={`${coinIcon}GBYTE.svg`} alt='GBYTE' />
          </Box>
          <Typography sx={styles.label}>GBYTE</Typography>
        </Box>
      </MenuItem> */}
      {assets.map((ast) => (
        <MenuItem key={ast.assetId} value={ast.assetSymbol}>
          <Box sx={styles.item}>
            <Box sx={styles.icon}>
              {getAssetIcon(ast.assetSymbol) && (
                <img
                  alt={ast.assetSymbol || undefined}
                  src={`${coinIcon}${getAssetIcon(ast.assetSymbol)}`}
                />
              )}
            </Box>
            <Typography sx={styles.label}>{ast.assetSymbol}</Typography>
          </Box>
        </MenuItem>
      ))}
    </TextField>
  );
};

export default memo(AssetSelect);
