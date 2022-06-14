import { useState, useEffect } from 'react';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import EmailIcon from '@mui/icons-material/Email';

import styles from './AboutPage.module.scss';

const AboutPage = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSession().then(session => {
      if (!session) {
        router.push('/sign-in');
      } else {
        setIsLoading(false);
      }
    });
  }, []);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'calc(100vh - 68.5px)',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <h1>About Us</h1>
      <div className={styles.infoBlock}>
        <p>
          Our goal is to provide the highest quality services to make your
          clients fall in love with Turkey.
        </p>
        <p className={styles.textAlignment}>
          Booking Your Dream is a leading Russian DMC with office in Moscow.
          Tour operators, travel agencies, and other businesses from more than
          53 countries have selected us to experience an unforgettable Eurasian
          adventure.
        </p>
      </div>
      <Grid sx={{ marginTop: '50px' }} item xs={12} md={6}>
        <List>
          <ListItem sx={{ paddingLeft: '0' }}>
            <AccessTimeFilledIcon color="primary" />
            <ListItemText
              sx={{ marginLeft: '15px' }}
              primary="10:00 - 19:00 (except Sunday)"
            />
          </ListItem>
          <ListItem sx={{ paddingLeft: '0' }}>
            <AccountBalanceIcon color="primary" />
            <ListItemText
              sx={{ marginLeft: '15px' }}
              primary="Moscow, Tverskaya st., 86/2"
            />
          </ListItem>
          <ListItem sx={{ paddingLeft: '0' }}>
            <EmailIcon color="primary" />
            <ListItemText
              sx={{ marginLeft: '15px' }}
              primary="info@bookingdream.com"
            />
          </ListItem>
        </List>
      </Grid>
    </>
  );
};

export default AboutPage;
