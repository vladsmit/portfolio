import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import { store } from '../../store';
import { Header } from './Header';

describe('Header component', () => {
  it('should render Header component', () => {
    const onClick = jest.fn();
    
    const component = render(
      <Provider store={store}>
        <Header setIsOpen={onClick} />
      </Provider>,
    );

    expect(component).toMatchSnapshot();
  });
});
