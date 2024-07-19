import React from 'react';
import { Box, Typography, Container, Link } from '@mui/material';

function Footer() {
  return (
    <Box sx={{ bgcolor: 'background.paper', p: 6 }} component='footer'>
      <Container maxWidth='lg'>
        <Typography variant='h6' align='center' gutterBottom>
          Sewa Kos Online
        </Typography>
        <Typography
          variant='subtitle1'
          align='center'
          color='text.secondary'
          component='p'
        >
          Temukan kos yang cocok untuk Anda dengan mudah.
        </Typography>
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Link href='#' variant='body2'>
            About Us
          </Link>{' '}
          |{' '}
          <Link href='#' variant='body2'>
            Contact
          </Link>{' '}
          |{' '}
          <Link href='#' variant='body2'>
            Privacy Policy
          </Link>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
