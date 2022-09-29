/* eslint-disable no-unused-vars */
interface ISearchResultsConnectedProps {
  open: boolean;
  searchText: string;
  onClose: () => void;
  autoFocus: AutoFocusTypes;
  onKeyDown: React.KeyboardEventHandler<HTMLUListElement>;
  onSetFirstAddress: (address: string) => void;
}

interface ISearchResultsProps {
  data: ILabeledAddress[];
  open: boolean;
  onAddressClick: (address: string) => () => void;
  searchText: string;
  autoFocus: AutoFocusTypes;
  onKeyDown: React.KeyboardEventHandler<HTMLUListElement>;
}

interface ISearchedItemProps {
  onClick: () => void;
  address: string;
  label: string;
  searchText: string;
  index: number;
  arrLength: number;
  tvl?: number;
  autoFocus: AutoFocusTypes;
}

interface ILabeledAddress {
  address: string;
  label: string;
  tvl?: number;
}
