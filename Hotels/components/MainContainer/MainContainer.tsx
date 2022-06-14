import { FC, Fragment, ReactNode } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

interface IMainContainerProps {
  children: ReactNode;
}

const MainContainer: FC<IMainContainerProps> = props => {
  const { children } = props;

  return (
    <Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box
          sx={{
            bgcolor: 'transparent',
            margin: '30px 0',
          }}
        >
          {children}
        </Box>
      </Container>
    </Fragment>
  );
};

export default MainContainer;
