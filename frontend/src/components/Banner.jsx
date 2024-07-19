import React from 'react';
import { Box, Typography, Container } from '@mui/material';

function Banner() {
  return (
    <Box
      sx={{
        backgroundImage: 'url(https://www.idkos.com/images/slider/idkospemilik-kost-69.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '400px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        textAlign: 'center',
        p: 3,
      }}
    >
      <Container>
        <Typography variant='h2' component='h1' gutterBottom>
          Temukan Kos Impian Anda
        </Typography>
        <Typography variant='h5' component='h2'>
          Cari dan sewa kos dengan mudah dan cepat
        </Typography>
      </Container>
    </Box>
  );
}

export default Banner;
        