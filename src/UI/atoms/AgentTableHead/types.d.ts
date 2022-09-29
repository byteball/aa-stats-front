/* eslint-disable no-unused-vars */
interface IAgentTableHeadProps {
  onChangeSortType: (dataKey: keyof IGetTopAACombinedByTypeRes) => () => void;
  isSortSelected: (dataKey: keyof IGetTopAACombinedByTypeRes) => boolean;
}

interface IAgentTableHeadConf {
  label: string;
  value: keyof IGetTopAACombinedByTypeRes;
  sort: boolean;
}
