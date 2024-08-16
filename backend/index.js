const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const connectToDatabase = require('./config/db');
const path = require('path');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const detailKosRoutes = require('./routes/detailKosRoutes');
const kosRoutes = require('./routes/kosRoutes');

const port = process.env.port || 5000;
app.use(cookieParser());
app.use(express.json());
connectToDatabase();

app.use('/api/user', userRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/detailKos', detailKosRoutes);
app.use('/api/kos', kosRoutes);

__dirname = path.resolve();
app.use(express.static(path.join(__dirname + '/uploads')));

app.listen(port, () => {
  console.log(' listening on port ' + port);
});
