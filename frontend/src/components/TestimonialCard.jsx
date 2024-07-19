import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  CardHeader,
  Avatar,
} from '@mui/material';

function TestimonialCard({ image, name, testimonial }) {
  return (
    <Card>
      <CardHeader avatar={<Avatar src={image} />} title={name} />
      <CardContent>
        <Typography variant='body2' color='text.secondary'>
          {testimonial}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default TestimonialCard;
