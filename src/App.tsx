import { ReactElement, useEffect, useMemo } from 'react';

import {
  CssBaseline,
  ThemeProvider,
  StyledEngineProvider,
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'store';
import { getAssetsMetadata } from 'store/AAstats';
import { darkModeSelector } from 'store/UI';
import SnackStack from 'UI/atoms/SnackStack/SnackStack';

import Router from './Router';
import ModalStack from './UI/atoms/ModalStack/ModalStack';
import { theme } from './UI/theme';
import './css/fonts.css';

const App = (): ReactElement => {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector(darkModeSelector);
  const currentTheme = useMemo(() => createTheme(theme(darkMode)), [darkMode]);

  useEffect(() => {
    dispatch(getAssetsMetadata());
  }, [dispatch]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={currentTheme}>
        <CssBaseline />
        <BrowserRouter>
          <Router />
        </BrowserRouter>
        <SnackStack />
        <ModalStack />
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
