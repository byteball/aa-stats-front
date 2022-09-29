/* eslint-disable no-unused-vars */
interface IAgentsTableProps {
  data: IGetTopAACombinedByTypeRes[];
  isLoading: boolean;
  onChangeSortType: (dataKey: keyof IGetTopAACombinedByTypeRes) => () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onNavigate: (address: string) => () => void;
  handlePeriod: (value: number) => () => void;
  isSelectedPeriod: (value: number) => boolean;
  isSortSelected: (dataKey: keyof IGetTopAACombinedByTypeRes) => boolean;
  loaderRef: React.MutableRefObject<HTMLDivElement | null>;
}

type IMergedTopAA = Pick<IRenderAATvl, 'usd_balance'> &
  IRenderAddress & { agent: string };
