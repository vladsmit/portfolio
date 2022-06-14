import { useCallback, useState, useEffect } from 'react';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import styles from './AddHotelPage.module.scss';

const AddHotelPage = () => {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [descError, setDescError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleAddHotel = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!title) setTitleError(true);
      if (!address) setAddressError(true);
      if (!desc) setDescError(true);
      if (!image) setImageError(true);

      if (title && address && desc && image) {
        router.replace('/');

        const randomId = Math.random().toString(36).substring(2, 5);
        const newHotel = {
          id: randomId,
          title,
          address,
          image,
          desc,
        };

        fetch('/api/addHotel', {
          method: 'POST',
          body: JSON.stringify(newHotel),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        setTitleError(false);
        setAddressError(false);
        setDescError(false);
        setImageError(false);
        setTitle('');
        setAddress('');
        setDesc('');
        setImage('');
      }
    },
    [title, address, desc, image, router.replace],
  );

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
      <h1>Add New Hotel</h1>
      <form onSubmit={handleAddHotel} className={styles.form}>
        <TextField
          className={styles.textField}
          error={titleError}
          id="outlined-helperText"
          label="Name"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <TextField
          className={styles.textField}
          error={addressError}
          id="outlined-helperText"
          label="Address"
          value={address}
          onChange={e => setAddress(e.target.value)}
        />
        <TextField
          className={styles.textField}
          error={descError}
          id="outlined-helperText"
          label="Description"
          value={desc}
          onChange={e => setDesc(e.target.value)}
        />
        <TextField
          className={styles.textField}
          error={imageError}
          id="outlined-helperText"
          label="Image URL"
          value={image}
          onChange={e => setImage(e.target.value)}
        />
        <Button type="submit" sx={{ width: '20%' }} variant="contained">
          Add Hotel
        </Button>
      </form>
    </>
  );
};

export default AddHotelPage;
