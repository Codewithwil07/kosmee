import React from 'react';
import Header from '../components/Header';
import Banner from '../components/Banner';
import ImageSlider from '../components/ImageSlider';
import KosCard from '../components/KosCard';
import CityCard from '../components/CityCard';
import CampusCard from '../components/CampusCard';
import OfficeHospitalCard from '../components/OfficeHospitalCard';
import TestimonialCard from '../components/TestimonialCard';
import Footer from '../components/Footer';
import { Container, Grid, Typography, Box } from '@mui/material';

const kosData = [
  {
    image: 'https://source.unsplash.com/random/800x600?1',
    title: 'Kos A',
    description: 'Kos nyaman dengan fasilitas lengkap.',
  },
  {
    image: 'https://source.unsplash.com/random/800x601?2',
    title: 'Kos B',
    description: 'Dekat dengan pusat kota dan transportasi umum.',
  },
  {
    image: 'https://source.unsplash.com/random/800x602?3',
    title: 'Kos C',
    description: 'Lingkungan aman dan tenang.',
  },
  // Tambahkan lebih banyak data kos di sini
];

const cityData = [
  {
    image: 'https://source.unsplash.com/random/800x600?city1',
    city: 'Jakarta',
  },
  {
    image: 'https://source.unsplash.com/random/800x600?city2',
    city: 'Surabaya',
  },
  {
    image: 'https://source.unsplash.com/random/800x600?city3',
    city: 'Bandung',
  },
  // Tambahkan lebih banyak data kota di sini
];

const campusData = [
  {
    image: 'https://source.unsplash.com/random/800x600?campus1',
    campus: 'UI',
  },
  {
    image: 'https://source.unsplash.com/random/800x600?campus2',
    campus: 'ITB',
  },
  {
    image: 'https://source.unsplash.com/random/800x600?campus3',
    campus: 'UGM',
  },
  // Tambahkan lebih banyak data kampus di sini
];

const officeHospitalData = [
  {
    image: 'https://source.unsplash.com/random/800x600?office1',
    name: 'Kantor Pusat',
  },
  {
    image: 'https://source.unsplash.com/random/800x600?hospital1',
    name: 'Rumah Sakit Umum',
  },
  // Tambahkan lebih banyak data kantor dan rumah sakit di sini
];

const testimonialData = [
  {
    image: 'https://source.unsplash.com/random/800x600?person1',
    name: 'John Doe',
    testimonial: 'Kos ini sangat nyaman dan fasilitasnya lengkap.',
  },
  {
    image: 'https://source.unsplash.com/random/800x600?person2',
    name: 'Jane Smith',
    testimonial: 'Saya sangat puas dengan pelayanan di kos ini.',
  },
  // Tambahkan lebih banyak data testimoni di sini
];

function Home() {
  return (
    <div>
      <Header />
      <Banner />
      <Container sx={{ py: 8 }}>
        <Typography variant='h4' component='h2' gutterBottom>
          Kos Favorit
        </Typography>
        <Grid container spacing={4}>
          {kosData.map((kos, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <KosCard
                image={kos.image}
                title={kos.title}
                description={kos.description}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container sx={{ py: 8 }}>
        <Typography variant='h4' component='h2' gutterBottom>
          Rekomendasi Kos
        </Typography>
        <Grid container spacing={4}>
          {kosData.map((kos, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <KosCard
                image={kos.image}
                title={kos.title}
                description={kos.description}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container sx={{ py: 8 }}>
        <Typography variant='h4' component='h2' gutterBottom>
          Area Kota
        </Typography>
        <Grid container spacing={4}>
          {cityData.map((city, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <CityCard image={city.image} city={city.city} />
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container sx={{ py: 8 }}>
        <Typography variant='h4' component='h2' gutterBottom>
          Area Kampus
        </Typography>
        <Grid container spacing={4}>
          {campusData.map((campus, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <CampusCard image={campus.image} campus={campus.campus} />
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container sx={{ py: 8 }}>
        <Typography variant='h4' component='h2' gutterBottom>
          Sekitar Kantor & Rumah Sakit
        </Typography>
        <Grid container spacing={4}>
          {officeHospitalData.map((office, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <OfficeHospitalCard image={office.image} name={office.name} />
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container sx={{ py: 8 }}>
        <Typography variant='h4' component='h2' gutterBottom>
          Testimoni
        </Typography>
        <Grid container spacing={4}>
          {testimonialData.map((testimonial, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <TestimonialCard
                image={testimonial.image}
                name={testimonial.name}
                testimonial={testimonial.testimonial}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      <Footer />
    </div>
  );
}

export default Home;
