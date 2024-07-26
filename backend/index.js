const express = require('express');
const cookieParser = require('cookie-parser');
const connectToDatabase = require('./config/db');
const path = require('path');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

const port = process.env.port || 5000;
const app = express();
app.use(cookieParser());
app.use(express.json());

connectToDatabase();

app.use('/api/user', userRoutes);
app.use('/api/upload', uploadRoutes);

 __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname + '/uploads')));

app.listen(port, () => {
  console.log(' listening on port ' + port);
});
