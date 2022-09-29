import { FC, memo, MouseEvent, useCallback, useRef } from 'react';

import { Box, Skeleton, Typography } from '@mui/material';

import { totalGraphActivitiesUiControls } from 'conf/uiControls';
import ActionButtons from 'UI/atoms/ActionButtons/ActionButtons';
import LineChart from 'UI/atoms/LineChart/LineChart';
import SelectButtons from 'UI/atoms/SelectButtons/SelectButtons';
import ShareMenu from 'UI/atoms/ShareMenu/ShareMenu';
import WaterMark from 'UI/atoms/WaterMark/WaterMark';
import NeuBox from 'UI/templates/NeuBox/NeuBox';

import { styles } from './styles';
import { ITotalGraphProps } from './types';

const TotalGraph: FC<ITotalGraphProps> = ({
  data,
  handlePeriod,
  isSelectedPeriod,
  handleActivities,
  isSelectedActivities,
  isLoading,
  presicion,
  actionButtonsConf,
  fullDaysBetweenStartAndEnd,
  serieLength,
  isEveryValOfSerieIsNull,
  mouseX,
  mouseY,
  onContextMenuClose,
  onContextMenu,
}) => {
  const stopPropagate = useCallback((e: MouseEvent) => e.stopPropagation(), []);
  const ref = useRef<HTMLElement | null>(null);
  return (
    <NeuBox ref={ref} onContextMenu={onContextMenu}>
      <Box sx={styles.root}>
        <Box sx={styles.header}>
          <Box sx={styles.headerLeft}>
            <Typography sx={styles.title}>Activity</Typography>
            <SelectButtons<ITotalWithTvlActivity>
              config={totalGraphActivitiesUiControls}
              handler={handleActivities}
              isSelected={isSelectedActivities}
            />
          </Box>
          <ActionButtons
            config={actionButtonsConf}
            handler={handlePeriod}
            isSelected={isSelectedPeriod}
          />
        </Box>
        <Box sx={styles.wrapper} onMouseDown={stopPropagate}>
          {!isLoading &&
            (isEveryValOfSerieIsNull ? (
              <Box sx={styles.nodata}>
                <Typography>no data</Typography>
              </Box>
            ) : (
              <LineChart
                data={data}
                fullDaysBetweenStartAndEnd={fullDaysBetweenStartAndEnd}
                precision={presicion}
                serieLength={serieLength}
              />
            ))}
        </Box>
        {isLoading && (
          <Skeleton
            animation='wave'
            sx={styles.skeleton}
            variant='rectangular'
          />
        )}
        <WaterMark />
        <ShareMenu
          mouseX={mouseX}
          mouseY={mouseY}
          refEl={ref}
          title='Activities Chart'
          onClose={onContextMenuClose}
        />
      </Box>
    </NeuBox>
  );
};

export default memo(TotalGraph);
