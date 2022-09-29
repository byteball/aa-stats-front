import {
  ChangeEventHandler,
  FC,
  KeyboardEventHandler,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import SearchIcon from '@mui/icons-material/Search';
import { Box, ClickAwayListener, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { fireSearchAnalitycsEvent } from 'lib/analytics';

import SearchResultsConnected from '../SearchResults/SearchResultsConnected';
import { styles } from './styles';

const Search: FC<ISearchProps> = ({ isPortable = false }) => {
  const [searchText, setSearchText] = useState('');
  const [open, setOpen] = useState(false);
  const [autoFocus, setAutoFocus] = useState<AutoFocusTypes>(null);
  const [firstAddress, setFirstAddress] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const nav = useNavigate();

  const handleSetFirstAddress = useCallback(
    (address: string) => setFirstAddress(address),
    []
  );

  const handleSelfFocus: KeyboardEventHandler<HTMLUListElement> = useCallback(
    (e) => {
      if (
        inputRef &&
        inputRef.current &&
        !['ArrowUp', 'ArrowDown', 'Enter'].includes(e.code)
      ) {
        inputRef.current.focus();
      }
    },
    []
  );

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = useCallback((e) => {
    setOpen(true);
    setSearchText(e.currentTarget.value);
    setAutoFocus(null);
  }, []);

  const handleClose = useCallback(() => {
    setSearchText('');
    setOpen(false);
  }, []);

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (e.code === 'Enter') {
        e.preventDefault();
        fireSearchAnalitycsEvent(searchText);
        setAutoFocus('down');
        if (firstAddress) {
          nav(`aa/${firstAddress}`);
          setSearchText('');
        }
        setOpen(false);
      }
      if (e.code === 'ArrowDown') {
        e.preventDefault();
        fireSearchAnalitycsEvent(searchText);
        setAutoFocus('down');
      }
      if (e.code === 'ArrowUp') {
        e.preventDefault();
        fireSearchAnalitycsEvent(searchText);
        setAutoFocus('up');
      }
    },
    [firstAddress, nav, searchText]
  );

  useEffect(() => {
    if (searchText.length === 0 && open) setOpen(false);
  }, [open, searchText.length]);

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box sx={styles.root}>
        <TextField
          autoComplete='off'
          inputRef={inputRef}
          placeholder='address or description'
          size={isPortable ? 'medium' : 'small'}
          sx={styles.field}
          value={searchText}
          InputProps={{
            sx: styles.input,
            startAdornment: <SearchIcon />,
          }}
          fullWidth
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <SearchResultsConnected
          autoFocus={autoFocus}
          open={open}
          searchText={searchText}
          onClose={handleClose}
          onKeyDown={handleSelfFocus}
          onSetFirstAddress={handleSetFirstAddress}
        />
      </Box>
    </ClickAwayListener>
  );
};

export default memo(Search);
