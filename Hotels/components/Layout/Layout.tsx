import { FC, ReactNode } from 'react';

import MainHeader from '../MainHeader';
import MainContainer from '../MainContainer';

interface ILayoutProps {
  children: ReactNode;
}

const Layout: FC<ILayoutProps> = props => {
  const { children } = props;

  return (
    <>
      <MainHeader />
      <MainContainer>{children}</MainContainer>
    </>
  );
};

export default Layout;
