import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import { store } from '../../store';
import { NewSeriesModal } from './NewSeriesModal';

describe('NewSeriesModal component', () => {
  it('should render NewSeriesModal component', () => {
    let isOpen = true;
    const onClick = jest.fn(() => (isOpen = !isOpen));
    
    const component = render(
      <Provider store={store}>
        <NewSeriesModal isOpen={isOpen} setIsOpen={onClick} />
      </Provider>,
    );

    expect(component).toMatchSnapshot();
  });
});
