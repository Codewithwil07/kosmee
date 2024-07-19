import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from '@mui/material';

function CampusCard({ image, campus }) {
  return (
    <Card>
      <CardActionArea>
        <CardMedia component='img' height='140' image={image} alt={campus} />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div'>
            {campus}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default CampusCard;
