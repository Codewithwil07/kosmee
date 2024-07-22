const mongoose = require('mongoose');

const PemilikSchema = new mongoose.Schema({
  nama: { type: String, required: true },
  email: { type: String, required: true },
  nomor_hp: { type: String, required: true },
  password: { type: String, required: true },
});

const Pemilik = mongoose.model('Pemilik', PemilikSchema);
module.exports = Pemilik;
