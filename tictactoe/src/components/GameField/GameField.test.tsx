import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import { store } from '../../store';
import { GameField } from './GameField';

describe('GameField component', () => {
  it('should render GameField component', () => {
    const component = render(
      <Provider store={store}>
        <GameField />
      </Provider>,
    );

    expect(component).toMatchSnapshot();
  });
});