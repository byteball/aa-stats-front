import {
  CssBaseline,
  ThemeProvider as MuiThemeProvider,
  StyledEngineProvider,
  createTheme,
} from '@mui/material';
import { Provider as StoreProvider } from 'react-redux';
import { addDecorator } from '@storybook/react';
import { theme as muiTheme } from '../src/UI/theme';
import { ThemeProvider } from 'emotion-theming';
import { MemoryRouter } from 'react-router-dom';
import appStore from '../src/store/';

addDecorator((Story, context) => {
  const theme = createTheme(muiTheme(context.globals.theme === 'dark'));
  return (
    <StyledEngineProvider injectFirst>
      <StoreProvider store={appStore}>
        <ThemeProvider theme={theme}>
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <MemoryRouter initialEntries={['/']}>
              <Story />
            </MemoryRouter>
          </MuiThemeProvider>
        </ThemeProvider>
      </StoreProvider>
    </StyledEngineProvider>
  );
});

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      items: ['light', 'dark'],
      showName: true,
    },
  },
};
