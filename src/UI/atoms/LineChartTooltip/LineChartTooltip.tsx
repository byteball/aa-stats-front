import { FC, memo, useMemo } from 'react';

import { Box, Divider, Typography } from '@mui/material';
import { PointTooltipProps } from '@nivo/line';

import { usd } from 'lib/currency';
import NeuBox from 'UI/templates/NeuBox/NeuBox';

const LineChartTooltip: FC<PointTooltipProps> = ({ point }) => {
  const { serieId, serieColor, data } = point;
  const { xFormatted, yFormatted, y } = data;

  const printedY = useMemo(
    () =>
      `${yFormatted}`.indexOf('$') !== -1
        ? usd(+y, 2)
        : (+y).toLocaleString(navigator.language || 'en-US', {
            maximumFractionDigits: 2,
          }),
    [y, yFormatted]
  );

  return (
    <NeuBox>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          minWidth: '140px',
        }}
      >
        <Typography>{xFormatted}</Typography>
        <Box
          sx={{
            bgcolor: serieColor,
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            marginLeft: '10px',
          }}
        />
      </Box>
      <Divider />
      <Box>
        <Typography>
          {serieId}: <b>{printedY}</b>
        </Typography>
      </Box>
    </NeuBox>
  );
};

export default memo(LineChartTooltip);
