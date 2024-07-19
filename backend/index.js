const express = require('express');
const cookieParser = require('cookie-parser');
const connectToDatabase = require('./config/db');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');

const port = process.env.port || 5000;
const app = express();
app.use(cookieParser());
app.use(express.json());
connectToDatabase();

app.use('/api/user', userRoutes);

app.listen(port, () => {
  console.log(' listening on port ' + port);
});
