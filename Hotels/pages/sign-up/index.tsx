import { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import type { GetServerSidePropsContext } from 'next';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { getAllUsers } from '../../helpers/api-util';
import { IUser } from '../../types';

const SignUpPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailErrorText, setEmailErrorText] = useState('');
  const [passwordErrorText, setPasswordErrorText] = useState('');

  const createUser = useCallback(async (email: string, password: string) => {
    const id = Math.random().toString(36).substring(2, 5);

    const response = await fetch('api/auth/signUp', {
      method: 'POST',
      body: JSON.stringify({ id, email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    return data;
  }, []);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const allUsers: IUser[] = await getAllUsers();
      const duplicatedEmail = allUsers.find(user => user.email === email);

      if (!email || !email.includes('@')) {
        setEmailError(true);
        setEmailErrorText('Email should contain @ symbol');
      }
      if (!password || password.trim().length < 4) {
        setPasswordError(true);
        setPasswordErrorText('Password should be at least 4 characters long');
      }
      if (duplicatedEmail) {
        setEmailError(true);
        setEmailErrorText('This email already exists');
      }

      if (email.includes('@') && password.length >= 4 && !duplicatedEmail) {
        createUser(email, password);
        setEmail('');
        setPassword('');
        setEmailError(false);
        setPasswordError(false);
      }
    },
    [createUser, email, password],
  );

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            error={emailError}
            helperText={emailError && emailErrorText}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={passwordError}
            helperText={passwordError && passwordErrorText}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link
                onClick={() => router.push('/sign-in')}
                variant="body2"
                sx={{ cursor: 'pointer' }}
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

export default SignUpPage;
