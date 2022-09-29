import { MouseEvent } from 'react';

import { Serie } from '@nivo/line';

import { yAxisTypes } from 'UI/atoms/LineChart/types';

/* eslint-disable no-unused-vars */
export interface IAgentGraphProps {
  data: Serie[];
  handlePeriod: (value: number) => () => void;
  isSelectedPeriod: (value: number) => boolean;
  handleActivities: (value: keyof IAddressGraphData) => () => void;
  isSelectedActivities: (value: keyof IAddressGraphData) => boolean;
  presicion: 'hour' | 'day';
  yType: yAxisTypes;
  isLoading: boolean;
  actionButtonsConf: IUiControls[];
  selectButtonConf: IUiSelects<IAddressGraphData>[];
  fullDaysBetweenStartAndEnd: number;
  serieLength: number;
  isEveryValOfSerieIsNull: boolean;
  onContextMenu: (e: MouseEvent) => void;
  onContextMenuClose: () => void;
  mouseX: number | null;
  mouseY: number | null;
}
