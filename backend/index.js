const express = require('express');
const cookieParser = require('cookie-parser');
const connectToDatabase = require('./config/db');
const path = require('path');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const detailKosRoutes = require('./routes/detailKosRoutes');
const kosRoutes = require('./routes/kosRoutes');

const port = process.env.port || 5000;
const app = express();
app.use(cookieParser());
app.use(express.json());

connectToDatabase();

app.use('/api/user', userRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/detailKos', detailKosRoutes);
app.use('/api/kos', kosRoutes);

const uploadsPath = path.resolve(__dirname, 'uploads');
app.use('/uploads', express.static(uploadsPath));

app.listen(port, () => {
  console.log(' listening on port ' + port);
});
