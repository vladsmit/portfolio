import { FC, useState, useEffect } from 'react';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';

import HotelCard from '../components/HotelCard';
import { getAllHotels } from '../helpers/api-util';
import { IHotel } from '../types';

interface IHomePageProps {
  hotels: IHotel[];
}

const HomePage: FC<IHomePageProps> = props => {
  const { hotels } = props;

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
      <h1>Hotel List</h1>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 1, sm: 8, md: 12 }}
        >
          {hotels?.length ? (
            hotels?.map(hotel => (
              <Grid key={hotel.id} item xs={2} sm={4} md={4}>
                <HotelCard hotel={hotel} />
              </Grid>
            ))
          ) : (
            <p className="fetchingErrorMsg">
              We have some technical problems with fetching best hotels...
            </p>
          )}
        </Grid>
      </Box>
    </>
  );
};

export const getStaticProps = async () => {
  const hotels = await getAllHotels();

  return {
    props: {
      hotels: hotels,
    },
    revalidate: 60,
  };
};

export default HomePage;
