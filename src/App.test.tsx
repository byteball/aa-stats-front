import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import App from './App';

describe('With React Testing Library', () => {
  const initialState = { notifications: { snackbars: [] } };
  const mockStore = configureStore();
  let store;

  it('Shows "error"', () => {
    store = mockStore(initialState);
    const { getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(getByText('error')).not.toBeNull();
  });
});
