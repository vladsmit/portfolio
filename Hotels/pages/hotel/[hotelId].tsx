import { FC, useState, useEffect } from 'react';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import type { GetStaticPropsContext } from 'next';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { getAllHotels, getHotelById } from '../../helpers/api-util';
import { IHotel } from '../../types';
import styles from './HotelPage.module.scss';

interface IHotelPageProps {
  hotel: IHotel;
}

const HotelPage: FC<IHotelPageProps> = props => {
  const { hotel } = props;

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  if (!hotel) {
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
      <h1>{hotel?.title}</h1>
      <div className={styles.hotelInfoBlock}>
        <div className={styles.hotelInfo}>
          <p className={styles.addressTitle}>Address:</p>
          <p className={styles.desc}>{hotel?.address}</p>
          <p className={styles.aboutHotelTitle}>About hotel:</p>
          <p className={styles.desc}>{hotel?.desc}</p>
        </div>
        <img
          className={styles.img}
          src={hotel?.image}
          alt="hotel"
          width="40%"
        />
      </div>
    </>
  );
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { params } = context;
  const hotelId = params?.hotelId;

  const selectedHotel = await getHotelById(hotelId);

  if (!selectedHotel) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      hotel: selectedHotel,
    },
    revalidate: 30,
  };
};

export const getStaticPaths = async () => {
  const hotels: IHotel[] = await getAllHotels();
  const paths = hotels?.map(hotel => ({ params: { hotelId: hotel.id } }));

  return {
    paths: paths,
    fallback: true,
  };
};

export default HotelPage;
