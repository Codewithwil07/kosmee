const mongoose = require('mongoose');

const PemilikSchema = new mongoose.Schema({
  nama: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  nomorHp: { type: Number, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
  isPemilik: { type: Boolean, required: true, default: true },
});

const Pemilik = mongoose.model('Pemilik', PemilikSchema);
module.exports = Pemilik;
