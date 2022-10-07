import { FC, memo, useCallback, useEffect, useMemo } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAppSelector } from 'store';
import { fullFlattenDefinedDataSelector } from 'store/Obyte';

import SearchResults from './SearchResults';

const SearchResultsConnected: FC<ISearchResultsConnectedProps> = ({
  open,
  searchText,
  onClose,
  autoFocus,
  onKeyDown,
  onSetFirstAddress,
}) => {
  const nav = useNavigate();
  const fullFlattenDefinedData = useAppSelector(fullFlattenDefinedDataSelector);

  const handleAgentsPageReplaceFabric = useCallback(
    (address: string) => () => {
      nav(`address/${address}`);
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      onClose();
    },
    [nav, onClose]
  );

  const searchedData = useMemo(() => {
    if (searchText.length > 0) {
      return [
        ...fullFlattenDefinedData.filter((data) =>
          data.address.toLowerCase().includes(searchText.toLowerCase())
        ),
        ...fullFlattenDefinedData.filter((data) =>
          data.label.toLowerCase().includes(searchText.toLowerCase())
        ),
      ].slice(0, 25);
    }
    return [];
  }, [fullFlattenDefinedData, searchText]);

  useEffect(() => {
    if (searchedData.length > 0) onSetFirstAddress(searchedData[0].address);
  }, [onSetFirstAddress, searchedData]);

  return (
    <SearchResults
      autoFocus={autoFocus}
      data={searchedData}
      open={open}
      searchText={searchText}
      onAddressClick={handleAgentsPageReplaceFabric}
      onKeyDown={onKeyDown}
    />
  );
};

export default memo(SearchResultsConnected);
