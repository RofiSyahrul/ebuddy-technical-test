'use client';

import { useActionState } from 'react';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import { login } from '../actions';

export default function LoginForm() {
  const [state, action, isPending] = useActionState(login, {
    error: null,
    payload: null,
  });

  return (
    <Grid
      action={action}
      alignItems='center'
      component='form'
      container
      flex='1'
      padding='8px'
      spacing={1}
    >
      {state.error && (
        <Grid size={12}>
          <Alert severity='error' variant='filled'>
            {state.error}
          </Alert>
        </Grid>
      )}

      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <TextField
          autoComplete='email'
          defaultValue={state.payload?.email}
          fullWidth
          label='Email'
          name='email'
          placeholder='Input your email'
          required
          size='small'
          type='email'
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <TextField
          autoComplete='current-password'
          defaultValue={state.payload?.password}
          fullWidth
          label='Password'
          name='password'
          placeholder='Password'
          required
          size='small'
          type='password'
        />
      </Grid>

      <Grid
        alignSelf={{ xs: 'flex-end', md: 'center' }}
        size={{ xs: 12, md: 4 }}
      >
        <Button
          disabled={isPending}
          fullWidth
          startIcon={
            isPending && <CircularProgress color='inherit' size={24} />
          }
          size='medium'
          type='submit'
          variant='contained'
        >
          Login
        </Button>
      </Grid>
    </Grid>
  );
}
