import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import { store } from '../../store';
import { Footer } from './Footer';

describe('Footer component', () => {
  it('should render Footer component', () => {
    const component = render(
      <Provider store={store}>
        <Footer />
      </Provider>,
    );

    expect(component).toMatchSnapshot();
  });
});
