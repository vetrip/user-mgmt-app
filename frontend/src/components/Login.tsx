import React from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Box, Button, Container, Typography, Paper } from '@mui/material';

const Login: React.FC = () => {
  const { oktaAuth } = useOktaAuth();

  const login = async () => {
    await oktaAuth.signInWithRedirect();
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography component="h1" variant="h5">
            User Management System
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={login}
            sx={{ mt: 3 }}
          >
            Sign in with Okta
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login; 