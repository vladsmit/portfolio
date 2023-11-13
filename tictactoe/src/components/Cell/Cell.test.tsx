import { render, screen, fireEvent } from '@testing-library/react';

import { Cell } from './Cell';

describe('Cell component', () => {
  it('should render Cell component with cross image', () => {
    const component = render(<Cell sign="cross" onClick={() => {}} />);

    expect(component).toMatchSnapshot();
  });

  it('should activate function after clicking on the cell', () => {
    const onClick = jest.fn();
    render(<Cell sign={null} onClick={onClick} />);

    fireEvent.click(screen.getByTestId('wrapper'));

    expect(onClick).toHaveBeenCalled();
  });
});
