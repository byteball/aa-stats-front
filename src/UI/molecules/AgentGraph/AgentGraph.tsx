import { FC, memo, MouseEvent, useCallback, useRef } from 'react';

import { Box, Skeleton, Typography } from '@mui/material';

import { useMedia } from 'lib/useMedia';
import ActionButtons from 'UI/atoms/ActionButtons/ActionButtons';
import AssetSelect from 'UI/atoms/AssetSelect/AssetSelect';
import LineChart from 'UI/atoms/LineChart/LineChart';
import SelectButtons from 'UI/atoms/SelectButtons/SelectButtons';
import ShareMenu from 'UI/atoms/ShareMenu/ShareMenu';
import WaterMark from 'UI/atoms/WaterMark/WaterMark';
import NeuBox from 'UI/templates/NeuBox/NeuBox';

import { styles } from './styles';
import { IAgentGraphProps } from './types';

const AgentGraph: FC<IAgentGraphProps> = ({
  data,
  handlePeriod,
  isSelectedPeriod,
  handleActivities,
  isSelectedActivities,
  presicion,
  yType,
  isLoading,
  actionButtonsConf,
  selectButtonConf,
  isEveryValOfSerieIsNull,
  fullDaysBetweenStartAndEnd,
  mouseX,
  mouseY,
  onContextMenu,
  onContextMenuClose,
  serieLength,
}) => {
  const stopPropagate = useCallback((e: MouseEvent) => e.stopPropagation(), []);
  const { isMobile } = useMedia();

  const ref = useRef<HTMLElement | null>(null);

  return (
    <NeuBox ref={ref} onContextMenu={onContextMenu}>
      <Box sx={styles.root}>
        <Box sx={styles.header}>
          <Box sx={styles.headerTop}>
            <AssetSelect />
            <SelectButtons<IAddressGraphData>
              config={selectButtonConf}
              handler={handleActivities}
              isSelected={isSelectedActivities}
            />
          </Box>
          {!isMobile && (
            <ActionButtons
              config={actionButtonsConf}
              handler={handlePeriod}
              isSelected={isSelectedPeriod}
            />
          )}
        </Box>
        <Box sx={styles.wrapper} onMouseDown={stopPropagate}>
          {!isLoading &&
            (!isEveryValOfSerieIsNull ? (
              <LineChart
                data={data}
                fullDaysBetweenStartAndEnd={fullDaysBetweenStartAndEnd}
                precision={presicion}
                serieLength={serieLength}
                yType={yType}
              />
            ) : (
              <Box sx={styles.nodata}>
                <Typography>no data</Typography>
              </Box>
            ))}
        </Box>
        {isMobile && (
          <Box sx={styles.footer}>
            <ActionButtons
              config={actionButtonsConf}
              handler={handlePeriod}
              isSelected={isSelectedPeriod}
            />
          </Box>
        )}
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
          title='Agent Chart'
          onClose={onContextMenuClose}
        />
      </Box>
    </NeuBox>
  );
};

export default memo(AgentGraph);
