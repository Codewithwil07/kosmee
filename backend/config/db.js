const mongoose = require('mongoose');

const connectToDatabase = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/kosmee');
    console.log('Successfully connected to database');
  } catch (error) {
    console.error({ error: error.message });
    process.exit(1);
  }
};

module.exports = connectToDatabase;
