import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from '@mui/material';

function CityCard({ image, city }) {
  return (
    <Card>
      <CardActionArea>
        <CardMedia component='img' height='140' image={image} alt={city} />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {city}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default CityCard;
