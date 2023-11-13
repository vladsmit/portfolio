import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import { store } from '../store';
import { App } from './App';

describe('App component', () => {
  it('should render App component', () => {
    const component = render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    expect(component).toMatchSnapshot();
  });
});
