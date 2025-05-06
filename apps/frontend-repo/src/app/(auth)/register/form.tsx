'use client';

import { useActionState } from 'react';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import { register } from '../actions';

export default function RegisterForm() {
  const [state, action, isPending] = useActionState(register, {
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

      <Grid size={{ xs: 12, md: 3 }}>
        <TextField
          autoComplete='name'
          defaultValue={state.payload?.name}
          fullWidth
          label='Name'
          name='name'
          placeholder='Input your name'
          required
          size='small'
          type='text'
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
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

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <TextField
          autoComplete='new-password'
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
        size={{ xs: 12, md: 3 }}
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
          Register
        </Button>
      </Grid>
    </Grid>
  );
}
