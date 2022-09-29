/* eslint-disable no-unused-vars */
import { MouseEvent } from 'react';

import { Serie } from '@nivo/line';

export interface ITotalGraphProps {
  data: Serie[];
  handlePeriod: (value: number) => () => void;
  isSelectedPeriod: (value: number) => boolean;
  handleActivities: (value: keyof ITotalWithTvlActivity) => () => void;
  isSelectedActivities: (value: keyof ITotalWithTvlActivity) => boolean;
  isLoading: boolean;
  presicion: 'hour' | 'day';
  actionButtonsConf: IUiControls[];
  fullDaysBetweenStartAndEnd: number;
  serieLength: number;
  isEveryValOfSerieIsNull: boolean;
  onContextMenu: (e: MouseEvent) => void;
  onContextMenuClose: () => void;
  mouseX: number | null;
  mouseY: number | null;
}
