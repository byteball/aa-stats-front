import { StrictMode } from 'react';

import ReactDOM from 'react-dom';
import ReactGA from 'react-ga4';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as StoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { GA_MEASUREMENT_ID } from 'conf/constants';
import ErrorBoundary from 'errorBoundary';

import App from './App';
import reportWebVitals from './reportWebVitals';
import appStore, { persistor } from './store';

if (GA_MEASUREMENT_ID) ReactGA.initialize(GA_MEASUREMENT_ID);

ReactDOM.render(
  <StrictMode>
    <ErrorBoundary>
      <StoreProvider store={appStore}>
        <PersistGate persistor={persistor}>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </PersistGate>
      </StoreProvider>
    </ErrorBoundary>
  </StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
