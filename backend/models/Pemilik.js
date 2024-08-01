const mongoose = require('mongoose');

const PemilikSchema = new mongoose.Schema({
  nama: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  nomorHp: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
});

const Pemilik = mongoose.model('Pemilik', PemilikSchema);
module.exports = Pemilik;
