import { FC, useCallback } from 'react';
import { useRouter } from 'next/router';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { IHotel } from '../../types';

interface IHotelCardProps {
  hotel: IHotel;
}

const HotelCard: FC<IHotelCardProps> = props => {
  const { hotel } = props;

  const router = useRouter();

  const handleNavigate = useCallback(
    (hotelId: string) => {
      router.push(`/hotel/${hotelId}`);
    },
    [router.push],
  );

  return (
    <Card sx={{ maxWidth: 440, margin: 'auto' }}>
      <CardMedia
        component="img"
        alt="hotel img"
        height="240"
        image={hotel.image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {hotel.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {hotel.address}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => handleNavigate(hotel.id)}>
          More Info
        </Button>
      </CardActions>
    </Card>
  );
};

export default HotelCard;
